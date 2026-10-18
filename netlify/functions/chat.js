// Netlify Function: server-side proxy for the ARE 201 Study Tools tutor.
// The API key lives only in the Netlify environment variable ANTHROPIC_API_KEY.
//
// Guardrails against other people spending the key:
//   1. Only browsers on the Dr. Tremendous site may call it (Origin check).
//   2. Only ARE 201 tutor requests are accepted (system prompt must be the tutor's).
//   3. Request size, history length, and reply length are capped.
//   4. Each visitor is rate-limited (per warm function instance).
// These deter casual misuse. The real backstop is a monthly spending limit in the
// Anthropic console.

const ALLOWED_ORIGINS = [
  /^https:\/\/drtremendous\.netlify\.app$/,
  /^https:\/\/[a-z0-9-]+--drtremendous\.netlify\.app$/   // Netlify deploy previews
];
const TUTOR_PREFIX = "You are the ARE 201";
const MAX_SYSTEM_CHARS = 16000;
const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 4000;
const MAX_TOTAL_CHARS = 40000;
const RATE_LIMIT = 40;               // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes per visitor
const hits = new Map();

const reply = (statusCode, obj) => ({
  statusCode,
  headers: { "content-type": "application/json", "cache-control": "no-store" },
  body: JSON.stringify(obj)
});

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });

  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || "";
  if (!ALLOWED_ORIGINS.some(re => re.test(origin))) return reply(403, { error: "Not allowed" });

  const ip = (event.headers && (event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"])) || "unknown";
  if (rateLimited(String(ip).split(",")[0].trim())) {
    return reply(429, { error: "Too many requests. Wait a few minutes and try again." });
  }

  if (!process.env.ANTHROPIC_API_KEY) return reply(500, { error: "ANTHROPIC_API_KEY is not set" });

  let payload;
  try { payload = JSON.parse(event.body || "{}"); } catch (e) { return reply(400, { error: "Bad JSON" }); }

  const { system, messages } = payload;
  if (typeof system !== "string" || !Array.isArray(messages) || messages.length === 0) {
    return reply(400, { error: "Expected { system, messages }" });
  }
  if (!system.startsWith(TUTOR_PREFIX) || system.length > MAX_SYSTEM_CHARS) {
    return reply(400, { error: "Not a tutor request" });
  }
  const trimmed = messages.slice(-MAX_MESSAGES);
  let total = system.length;
  for (const m of trimmed) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
      return reply(400, { error: "Bad message" });
    }
    if (m.content.length > MAX_MESSAGE_CHARS) return reply(400, { error: "Message too long" });
    total += m.content.length;
  }
  if (total > MAX_TOTAL_CHARS) return reply(400, { error: "Conversation too long. Start over to keep going." });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 700,
        system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
        messages: trimmed
      })
    });
    if (!r.ok) return reply(502, { error: "Upstream error", status: r.status });
    const data = await r.json();
    const text = (data.content || []).map(b => (b.type === "text" ? b.text : "")).filter(Boolean).join("\n");
    return reply(200, { text });
  } catch (e) {
    return reply(502, { error: "Request failed" });
  }
};
