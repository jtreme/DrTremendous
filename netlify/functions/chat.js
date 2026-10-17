// Netlify Function: server-side proxy for the ARE 201 Socratic Tutor.
// Holds the API key (set ANTHROPIC_API_KEY in Netlify environment variables)
// and caches the system prompt, which cuts input cost about 90% on repeat calls.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "POST only" }) };
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "ANTHROPIC_API_KEY is not set" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Bad JSON" }) };
  }

  const { system, messages } = payload;
  if (typeof system !== "string" || !Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "Expected { system, messages }" }) };
  }
  // Keep requests small: cap history length and system prompt size.
  const trimmed = messages.slice(-30);
  if (system.length > 20000) {
    return { statusCode: 400, body: JSON.stringify({ error: "System prompt too long" }) };
  }

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
        max_tokens: 1000,
        system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
        messages: trimmed
      })
    });

    if (!r.ok) {
      const detail = await r.text();
      return { statusCode: r.status, body: JSON.stringify({ error: "Upstream error", detail }) };
    }

    const data = await r.json();
    const text = (data.content || [])
      .map((b) => (b.type === "text" ? b.text : ""))
      .filter(Boolean)
      .join("\n");

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text })
    };
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: "Request failed" }) };
  }
};
