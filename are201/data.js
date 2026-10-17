/* ARE 201 Study Tools: content.
   Units, tutor modes, and prompt blocks come from the Socratic Tutor v4 (July 2026),
   updated to course conventions (opportunity cost vs. total economic cost,
   percent change from the starting value, production-side externalities). */
const UNITS = [
  { tag:"Unit 1", title:"Introduction to Ag & Resource Economics",
    concepts:"what economics studies; scarcity; the economic way of thinking; positive vs. normative statements; scope of agricultural & resource economics",
    skill:"telling apart positive (what is) from normative (what ought to be) claims, and applying the economic lens to food/resource questions",
    errors:"treating value judgments as facts; thinking economics is only about money" },
  { tag:"Unit 2", title:"First Principles: Scarcity & Opportunity Cost",
    concepts:"scarcity; trade-offs; opportunity cost (the value of the single next-best forgone alternative, including forgone time); explicit vs. implicit costs; total economic cost = explicit + implicit; marginal thinking; incentives",
    skill:"identifying opportunity cost as the value of the single next-best alternative given up, and keeping it separate from total economic cost (explicit outlay plus implicit cost)",
    errors:"folding the out-of-pocket outlay into opportunity cost instead of total economic cost; ignoring forgone earnings or time; adding up every alternative instead of just the next-best one" },
  { tag:"Unit 3", title:"Economic Models: Trade-offs & Trade",
    concepts:"production possibilities frontier (PPF); opportunity cost along the PPF; absolute vs. comparative advantage; gains from trade; terms of trade",
    skill:"finding comparative advantage from opportunity costs and checking that a proposed terms of trade lies between the two parties' opportunity costs",
    errors:"confusing absolute with comparative advantage; specializing in the wrong good; proposing terms of trade outside the range that benefits both" },
  { tag:"Unit 4", title:"Supply & Demand",
    concepts:"law of demand and supply; demand vs. supply shifters; movement along a curve vs. a shift of the curve; market equilibrium; surpluses and shortages; comparative statics",
    skill:"deciding whether an event moves you along a curve (own-price change) or shifts the whole curve (a determinant change), then predicting the new equilibrium",
    errors:"saying an own-price change 'shifts' the curve; confusing demand with quantity demanded; wrong side or direction of a shift" },
  { tag:"Unit 5", title:"Price Floors, Price Ceilings & Surplus",
    concepts:"consumer surplus; producer surplus; binding vs. non-binding price controls; resulting surplus/shortage; deadweight loss; ag policy tools (price floor with government purchases, deficiency payments, target price)",
    skill:"reading surplus and deadweight-loss areas off a supply-demand graph and tracing how a policy redistributes them",
    errors:"mislabeling which area is CS vs. PS vs. DWL; forgetting a floor only binds above equilibrium and a ceiling only below; dropping the government-cost box in ag policies" },
  { tag:"Unit 6", title:"Elasticity",
    concepts:"price elasticity of demand and supply; percent change measured from the starting value (not the midpoint method); price elasticity of demand keeps its negative sign; elastic/inelastic/unit-elastic; determinants; the total-revenue test; cross-price and income elasticity",
    skill:"interpreting the elasticity number and using the total-revenue test to predict how revenue moves when price changes",
    errors:"confusing slope with elasticity; sign/interpretation errors; getting the total-revenue direction backwards; computing percent change from the wrong base; dropping the negative sign on price elasticity of demand" },
  { tag:"Unit 7", title:"Utility",
    concepts:"total vs. marginal utility; diminishing marginal utility; the utility-maximization (equimarginal) rule MU/P equalized across goods; budget constraint",
    skill:"applying the equimarginal principle; spending so the marginal utility per dollar is equal across goods, subject to the budget",
    errors:"maximizing total utility instead of MU per dollar; comparing raw MU without dividing by price; ignoring the budget constraint" },
  { tag:"Unit 8a", title:"Production",
    concepts:"inputs and output; total, marginal, and average product; the law of diminishing marginal returns; short run vs. long run",
    skill:"distinguishing marginal product from average product and spotting where diminishing marginal returns set in",
    errors:"confusing marginal and average product; conflating diminishing returns with negative returns; mixing short- and long-run reasoning" },
  { tag:"Unit 8b", title:"Perfect Competition",
    concepts:"price taker; P = MR; profit maximization at MR = MC; shutdown (P vs. AVC) vs. exit (P vs. ATC); long-run zero economic profit; short vs. long run",
    skill:"finding the profit-maximizing quantity at MR = MC and applying the correct short-run shutdown vs. long-run exit test",
    errors:"confusing the shutdown rule (AVC) with the exit rule (ATC); mixing accounting and economic profit; forgetting P = MR for a price taker" },
  { tag:"Unit 9", title:"Imperfect Competition",
    concepts:"monopoly; MR < P; profit max at MR = MC then price read off demand; deadweight loss vs. perfect competition; price discrimination; monopolistic competition and oligopoly",
    skill:"solving a monopoly's quantity where MR = MC and then reading the PRICE up on the DEMAND curve (not off MR), and explaining the resulting deadweight loss",
    errors:"reading the price off MR instead of demand; assuming P = MR for a monopolist; not seeing why restricted output creates DWL" },
  { tag:"Unit 10", title:"Externalities & Public Goods",
    concepts:"negative and positive externalities (both drawn on the production side in this course: marginal social cost above marginal private cost for a negative externality, below it for a positive one); marginal social vs. private cost; the efficient quantity; Pigouvian taxes and subsidies; Coase reasoning; public goods (non-rival, non-excludable); the free-rider problem",
    skill:"comparing marginal social benefit to marginal social cost to find the efficient quantity and the direction of over- or under-production",
    errors:"getting the over/under-production direction wrong; confusing public goods with common resources; missing why free-riding causes under-provision" },
  { tag:"Unit 11", title:"International Trade",
    concepts:"comparative advantage revisited; world price vs. autarky price; who imports vs. exports; effects on consumer and producer surplus; tariffs and quotas and their deadweight loss",
    skill:"using the world vs. domestic price to determine the direction of trade and tracing which groups gain or lose, including tariff surplus areas",
    errors:"getting winners/losers backwards; mislabeling tariff revenue vs. DWL areas; wrong direction of trade relative to the world price" },
  { tag:"Unit 12", title:"Prisoner's Dilemma & Game Theory",
    concepts:"payoff matrix; dominant strategy; Nash equilibrium; cooperation vs. defection; why individually rational choices can be collectively bad",
    skill:"reading a payoff matrix to find each player's dominant strategy and the Nash equilibrium, and explaining the cooperation dilemma",
    errors:"misreading the payoff matrix; confusing 'best joint outcome' with the Nash equilibrium; not checking both players' incentives" }
];

const MODES = {
  concept: { label:"Understand a concept", best:"when a definition or idea feels fuzzy",
    intro:"Let's get this concept solid. Which part is fuzzy: the definition itself, or how it shows up in a problem?",
    frag:"ACTIVE MODE (CONCEPT HELP): First ask which part is confusing (the definition, or how it works in a problem). Then build intuition with a concrete everyday or agricultural/resource example BEFORE any formal definition. One question at a time." },
  graph: { label:"Work through a graph", best:"when you need to draw or read a graph",
    intro:"Let's build the graph together, one piece at a time. First: what goes on the horizontal axis, and what goes on the vertical axis here?",
    frag:"ACTIVE MODE (GRAPH HELP): Coach the student to build and read the graph THEMSELVES. Before explaining anything, have them identify, in this order and ONE at a time: (1) what's on each axis, (2) which curves are on it, (3) whether a curve SHIFTS or it's a MOVEMENT ALONG the curve, (4) the equilibrium, (5) any relevant areas (consumer surplus, producer surplus, deadweight loss). Confirm each step with a short question before moving on. Never state the final conclusion for them." },
  quiz: { label:"Quiz me Socratically", best:"when you want practice one question at a time",
    seed:"Quiz me on this unit; one question at a time.",
    frag:"ACTIVE MODE (SOCRATIC QUIZ): Ask exactly ONE question drawn from this unit, then STOP and wait for the student's answer. When they answer, say whether the reasoning holds and why in 2–3 sentences, then ask the next single question. Never present a list of questions." },
  check: { label:"Check my reasoning", best:"when you already picked an answer and want to test your logic",
    intro:"Go ahead; tell me your answer and the reasoning behind it. I'll pressure-test the thinking, not just the final answer.",
    frag:"ACTIVE MODE (CHECK REASONING): Evaluate the student's REASONING step by step, not just the final answer. IMPORTANT: if the student gives only a choice or final answer with no reasoning (e.g. \"I picked C\" or \"the answer is 40\"), do NOT evaluate it yet; first reply with EXACTLY this line and then wait: \"Before I judge the choice, give me your reason for picking it. What was the first economic clue you noticed?\" Once they give reasoning, point to the specific step that is strong or shaky and ask a question that makes them re-examine it. Do NOT restate the correct answer; lead them to repair it themselves." },
  explain: { label:"Why is my answer wrong?", best:"when feedback or a missed question confused you",
    intro:"No problem; wrong answers are the useful ones. Tell me the question and the answer you gave, and we'll find exactly where the logic slipped.",
    frag:"ACTIVE MODE (DIAGNOSE MISCONCEPTION): The student has a wrong answer. Gently name the specific misconception behind it (plainly, without judgment), then ask ONE question that surfaces the correct idea. Stay encouraging; do not simply hand over the right answer." },
  study: { label:"Study for an exam", best:"when you want mixed review",
    seed:"Help me study for the exam on this unit; start with one practice question.",
    frag:"ACTIVE MODE (EXAM STUDY): Ask SHORT Socratic practice questions from this unit, ONE at a time, and ROTATE across these five question types so each turn feels different; do not use the same type twice in a row: (1) a quick concept check, (2) an applied agricultural/resource example, (3) a graph-interpretation question, (4) a spot-the-common-misconception question, and (5) one short calculation WHEN the unit supports it. Ask one, wait for the answer, respond briefly in 2–3 sentences, then move to a DIFFERENT type. Prioritize this unit's common mistakes." }
};

const ANTI_ANSWER =
`IF THE STUDENT ASKS FOR THE ANSWER DIRECTLY: do not scold them. Respond warmly, beginning with EXACTLY this sentence: "I can't just give you the answer, but I can get you there quickly. Let's start with the first decision point." Then ask ONE focused question that starts them down the path.`;

const PRECISION = [
  "PRECISION POINTS: hold the student to these distinctions. If they blur two of them, don't just correct; ask a question that forces the distinction. Use these internal definitions to stay accurate, but don't dump them on the student unprompted:",
  "• Movement ALONG a curve (a change in quantity demanded/supplied) is caused by the good's OWN price. A SHIFT of the curve (a change in demand/supply) is caused by any OTHER determinant.",
  "• 'Demand' = the whole curve; 'quantity demanded' = one point at a given price. Same for 'supply' vs. 'quantity supplied'.",
  "• A price FLOOR is a legal MINIMUM (binds only when set ABOVE equilibrium → surplus). A price CEILING is a legal MAXIMUM (binds only when set BELOW equilibrium → shortage).",
  "• BINDING means the control actually changes the market outcome; NON-BINDING means it sits on the slack side and does nothing.",
  "• Consumer surplus = area below demand and above price. Producer surplus = area above supply and below price. Deadweight loss = the value of mutually beneficial trades NOT made because of a distortion.",
  "• Opportunity cost = the value of the SINGLE next-best alternative forgone (including time), not the sum of every alternative given up. Total economic cost = explicit (out-of-pocket) cost + implicit cost. Do not fold the explicit outlay into opportunity cost.",
  "• Externalities in this course are drawn on the production side: a negative externality puts marginal social cost ABOVE marginal private cost (overproduction); a positive externality puts marginal social cost BELOW marginal private cost (underproduction). A price floor where the government buys the surplus is called 'government purchases.'",
  "• Elasticity in this course: percent change = (new - starting) / starting. Do NOT teach or use the midpoint method. Price elasticity of demand keeps its negative sign; interpret its absolute value against 1."
].join('\n');

const QUESTIONS = [
  // Unit 1: intro / positive vs normative
  { u:0, d:1, type:"mc", concept:"positive vs. normative", prompt:"\"The government should raise farm subsidies.\" This statement is:", options:["positive, because it's about government policy","normative, because \"should\" signals a value judgment","positive, because subsidies can be measured","neither positive nor normative"], answer:1, why:"\"Should\" signals a value judgment: a normative statement, not a testable claim about what is." },
  { u:0, d:2, type:"mc", concept:"positive vs. normative", prompt:"Which of these is a positive statement?", options:["Farm subsidies ought to be eliminated","A higher corn price reduces the quantity of corn demanded","It's unfair that food prices rise","The government should help small farmers"], answer:1, why:"Only the second makes a testable claim about what is; the rest are value judgments." },
  { u:0, d:2, type:"mc", concept:"what economics studies", prompt:"Economics is best described as the study of how:", options:["to make money in business","people and societies allocate scarce resources","governments write budgets","the stock market behaves"], answer:1, why:"Economics is fundamentally about choices under scarcity; money is just one part." },
  { u:0, d:3, type:"mc", concept:"scarcity vs. shortage", prompt:"Which statement best captures SCARCITY as economists use the term?", options:["A temporary gap where quantity demanded exceeds quantity supplied at the current price","The permanent condition that wants exceed what limited resources can produce","A problem created only by price ceilings","Something only low-income countries face"], answer:1, why:"Scarcity is the permanent condition behind all economic choices. A shortage is temporary and specific to a price; scarcity exists even when markets clear." },

  // Unit 2: opportunity cost
  { u:1, d:1, type:"mc", concept:"opportunity cost", prompt:"Bo spends an hour playing chess instead of studying. His opportunity cost is:", options:["the money he spent on chess","the value of the studying he gave up","nothing, since chess is free","studying plus sleep plus everything else he could have done"], answer:1, why:"Opportunity cost is the value of the single next-best alternative forgone (here, the studying), not the sum of everything." },
  { u:1, d:3, type:"mc", concept:"total economic cost", prompt:"\"If I didn't have pottery class tonight, I'd save the $8 parking fee and spend 5 hours at work earning $10/hour.\" What is the total economic cost of attending pottery class?", options:["$8","$50","$58","$42"], answer:2, why:"Total economic cost = explicit cost ($8 parking) + implicit cost (5 × $10 = $50 in forgone wages) = $58. The opportunity cost is the next-best alternative alone, the $50 of work." },
  { u:1, d:2, type:"mc", concept:"opportunity cost", prompt:"Same pottery class: skipping it means saving the $8 parking fee and working 5 hours at $10/hour. What is the opportunity cost of attending?", options:["$50, the wages from the next-best use of the evening","$58, the parking plus the wages","$8, the parking fee","$0, because the class is already paid for"], answer:0, why:"Opportunity cost is the value of the next-best alternative: 5 hours of work worth $50. Adding the $8 parking gives total economic cost ($58), a different measure." },
  { u:1, d:2, type:"num", concept:"total economic cost", prompt:"You skip a work shift worth $60 and pay $15 for a concert ticket. What is the total economic cost of attending the concert, in dollars?", answer:75, tol:0.5, why:"Explicit cost ($15 ticket) + implicit cost ($60 forgone wages) = $75. The opportunity cost is the next-best alternative alone: the $60 shift." },
  { u:1, d:3, type:"mc", concept:"marginal thinking", prompt:"Which choice best reflects thinking \"at the margin\"?", options:["Deciding whether to study one more hour tonight","Adding up your total tuition bill","Calculating your cumulative GPA","Choosing a career for the rest of your life"], answer:0, why:"Marginal thinking weighs one additional unit (one more hour), not totals." },

  // Unit 3: trade-offs & trade
  { u:2, d:1, type:"mc", concept:"PPF efficiency", prompt:"A point INSIDE a production possibilities frontier (PPF) represents production that is:", options:["efficient","inefficient (resources idle or misused)","impossible","on the frontier"], answer:1, why:"Points inside the PPF waste resources; points on the frontier are efficient; points outside are unattainable." },
  { u:2, d:2, type:"mc", concept:"increasing opportunity cost", prompt:"Along a bowed-out PPF, as a country produces more corn the opportunity cost of each additional unit of corn:", options:["rises","falls","stays constant","is zero"], answer:0, why:"A bowed-out PPF reflects increasing opportunity cost as resources less suited to corn get pulled in." },
  { u:2, d:3, type:"mc", concept:"comparative advantage", prompt:"In one hour Eastland makes 1 orange OR 2 peaches; Westland makes 1 orange OR 4 peaches. Who has the comparative advantage in oranges?", options:["Eastland","Westland","Neither","Both equally"], answer:0, why:"Eastland gives up only 2 peaches per orange vs. Westland's 4, so Eastland's opportunity cost of oranges is lower." },
  { u:2, d:4, type:"mc", concept:"terms of trade", prompt:"Using those numbers (Eastland: 1 orange = 2 peaches; Westland: 1 orange = 4 peaches), a mutually beneficial terms of trade for oranges must fall between:", options:["2 and 4 peaches per orange","0 and 2 peaches per orange","4 and 6 peaches per orange","0.25 and 0.5 peaches per orange"], answer:0, why:"Terms of trade must sit between the two parties' opportunity costs of an orange; here, 2 and 4 peaches." },

  // Unit 4: supply & demand
  { u:3, d:1, type:"mc", concept:"movement vs. shift", prompt:"An increase in a good's OWN price causes:", options:["a leftward shift of the demand curve","a rightward shift of the demand curve","a movement along the demand curve (quantity demanded falls)","a shift of the supply curve"], answer:2, why:"An own-price change is a movement ALONG the demand curve (a change in quantity demanded), not a shift. Only the other determinants shift the curve." },
  { u:3, d:2, type:"mc", concept:"movement vs. shift", prompt:"A fall in the price of beef, holding all else constant, causes:", options:["a movement along the demand curve; quantity demanded rises","a rightward shift of the demand curve","a leftward shift of the demand curve","a shift of the supply curve"], answer:0, why:"Price is the good's own price, so we move along the demand curve; quantity demanded rises." },
  { u:3, d:2, type:"mc", concept:"demand shifters", prompt:"A study reports that grilling beef is healthier than once thought. In the beef market this causes:", options:["a movement along demand","a rightward shift of demand","a leftward shift of demand","a rightward shift of supply"], answer:1, why:"Tastes are a determinant other than price, so the whole demand curve shifts right." },
  { u:3, d:2, type:"mc", concept:"supply shock", prompt:"A drought kills part of the cattle herd. In the beef market, the most direct effect is:", options:["demand shifts left","supply shifts left, raising price and lowering quantity","supply shifts right, lowering price","quantity supplied rises"], answer:1, why:"A production shock shifts supply left; equilibrium price rises and quantity falls." },
  { u:3, d:4, type:"mc", concept:"double shift", prompt:"At the same time, consumer incomes rise (beef is a normal good) AND a drought hits ranchers. The new equilibrium price and quantity:", options:["price rises; quantity is ambiguous","price falls; quantity rises","both fall for certain","both rise for certain"], answer:0, why:"Demand shifts right and supply shifts left; both push price up, but they push quantity in opposite directions, so quantity is ambiguous." },

  // Unit 5: surplus & price controls
  { u:4, d:1, type:"mc", concept:"binding vs. non-binding", prompt:"A price floor set BELOW the equilibrium price is:", options:["binding, causing a surplus","binding, causing a shortage","non-binding, with no effect","against the law"], answer:2, why:"A floor only binds when set above equilibrium. Below equilibrium the market clears above it, so it does nothing." },
  { u:4, d:2, type:"mc", concept:"consumer surplus", prompt:"Consumer surplus is the area:", options:["above the demand curve and below the price","below the demand curve and above the price, up to the quantity traded","above the supply curve and below the price","under the entire demand curve"], answer:1, why:"Consumer surplus = willingness to pay (demand) minus price paid; the area below demand and above price." },
  { u:4, d:2, type:"mc", concept:"price floor with purchase", prompt:"The government sets a corn price floor of $16 (equilibrium is $12) and promises to buy any surplus. Compared with the free market, this:", options:["lowers the price and raises the quantity consumers buy","raises the price and creates a surplus the government purchases","causes a shortage of corn","has no effect because floors never bind"], answer:1, why:"A floor above equilibrium creates a surplus; the government buys it, at taxpayer expense." },
  { u:4, d:3, type:"num", concept:"consumer surplus calculation", prompt:"Demand is P = 20 − Q and supply is P = Q. At the equilibrium, what is consumer surplus (in dollars)?", answer:50, tol:0.5, why:"Equilibrium: 20 − Q = Q → Q = 10, P = 10. CS = ½ × Q × (demand intercept − P) = ½ × 10 × 10 = 50." },
  { u:4, d:3, type:"mc", concept:"deadweight loss", prompt:"A binding price ceiling on apartments (set below equilibrium) creates:", options:["a surplus of apartments","a shortage and a deadweight loss","higher producer surplus","no change to the market"], answer:1, why:"A binding ceiling causes a shortage; the trades that no longer happen are the deadweight loss." },

  // Unit 6: elasticity
  { u:5, d:1, type:"mc", concept:"perfectly inelastic demand", prompt:"\"I buy exactly one coffee every morning no matter what it costs.\" This describes demand that is:", options:["perfectly elastic","perfectly inelastic","unit elastic","slightly elastic"], answer:1, why:"Quantity doesn't respond to price at all; that's perfectly inelastic (elasticity ≈ 0)." },
  { u:5, d:2, type:"mc", concept:"elastic vs. inelastic", prompt:"A 10% price increase reduces quantity demanded by 5%. Demand is:", options:["elastic","inelastic","unit elastic","perfectly elastic"], answer:1, why:"Elasticity = −5% ÷ 10% = −0.5. Its absolute value is below 1, so demand is inelastic." },
  { u:5, d:2, type:"mc", concept:"total-revenue test", prompt:"Demand for a product is inelastic. If the seller raises the price, total revenue will:", options:["fall","rise","stay exactly the same","drop to zero"], answer:1, why:"When demand is inelastic, price and total revenue move in the same direction." },
  { u:5, d:3, type:"num", concept:"elasticity calculation", prompt:"The price of a bag of apples rises from $10 to $12, and quantity demanded falls from 100 to 90 bags. Measuring percent changes from the starting values, what is the price elasticity of demand? (Keep the sign.)", answer:-0.5, tol:0.02, why:"%ΔQ = (90 − 100)/100 = −10%; %ΔP = (12 − 10)/10 = +20%; elasticity = −10/20 = −0.5. Its absolute value is below 1, so demand is inelastic." },
  { u:5, d:3, type:"mc", concept:"determinants of elasticity", prompt:"A good with many close substitutes tends to have demand that is:", options:["more elastic","more inelastic","perfectly inelastic","always unit elastic"], answer:0, why:"Easy substitutes let buyers flee small price hikes, making demand more elastic." },

  // Unit 7: utility
  { u:6, d:1, type:"mc", concept:"diminishing marginal utility", prompt:"The third slice of pizza gives you less extra satisfaction than the second did. This illustrates:", options:["negative total utility","diminishing marginal utility","the free-rider problem","the law of supply"], answer:1, why:"Each additional unit adds less satisfaction than the one before: diminishing marginal utility. Total utility still rises as long as MU stays positive." },
  { u:6, d:1, type:"mc", concept:"total vs. marginal utility", prompt:"As long as marginal utility is positive, total utility is:", options:["falling","rising","constant","zero"], answer:1, why:"While marginal utility is positive, each extra unit still adds satisfaction, so total utility keeps rising. It falls only when MU turns negative." },
  { u:6, d:2, type:"mc", concept:"equimarginal rule", prompt:"The rule for maximizing utility is to spend so that you equalize:", options:["total utility across goods","marginal utility across goods","marginal utility per dollar (MU/P) across goods","the prices of the goods"], answer:2, why:"Utility is maximized when the last dollar spent on each good yields the same marginal utility (MU/P equal)." },
  { u:6, d:2, type:"num", concept:"equimarginal calculation", prompt:"You've maximized utility. The marginal utility of candy is 60 and of cake is 30. If a candy costs $2, what must a piece of cake cost (in dollars)?", answer:1, tol:0.05, why:"Set MU/P equal: 60/2 = 30/P → 30 = 30/P → P = $1." },
  { u:6, d:3, type:"mc", concept:"equimarginal reasoning", prompt:"You spend all your budget. MU of Captain Crunch = 9 (price $3); MU of Grape Nuts = 8 (price $2). To raise your utility you should buy:", options:["more Captain Crunch","more Grape Nuts","equal amounts of each","neither, you're done"], answer:1, why:"MU per dollar: Crunch = 9/3 = 3; Grape Nuts = 8/2 = 4. Grape Nuts gives more satisfaction per dollar, so shift toward it." },

  // Unit 8a: production
  { u:7, d:1, type:"mc", concept:"marginal product", prompt:"Marginal product is:", options:["total output divided by the number of workers","the extra output from adding one more unit of input","output per machine","output that always rises"], answer:1, why:"Marginal product is the change in output from one additional unit of the variable input." },
  { u:7, d:2, type:"mc", concept:"diminishing marginal returns", prompt:"The law of diminishing marginal returns says that as you add more of a variable input:", options:["total product must fall","marginal product eventually declines","average product stays constant","output stops completely"], answer:1, why:"Beyond some point each extra unit adds less than the one before; marginal product falls (though it can still be positive)." },
  { u:7, d:2, type:"num", concept:"marginal product calculation", prompt:"A farm with 3 workers harvests 120 bushels; with 4 workers it harvests 150 bushels. What is the marginal product of the 4th worker, in bushels?", answer:30, tol:0.5, why:"Marginal product = change in output from the added worker = 150 − 120 = 30 bushels." },
  { u:7, d:3, type:"mc", concept:"marginal vs. average product", prompt:"When marginal product is below average product, average product is:", options:["rising","falling","at its maximum","zero"], answer:1, why:"A marginal value below the average pulls the average down, like a low exam score lowering your GPA." },
  { u:7, d:4, type:"mc", concept:"MP and AP relationship", prompt:"Marginal product equals average product exactly where average product is:", options:["at its maximum","at its minimum","equal to zero","rising fastest"], answer:0, why:"When MP is above AP it pulls the average up; when below, it pulls it down. So MP crosses AP right at AP's peak." },

  // Unit 8b: perfect competition
  { u:8, d:1, type:"mc", concept:"price taker", prompt:"Because a perfectly competitive firm is a price taker, its marginal revenue equals:", options:["the market price","zero","average total cost","marginal cost by definition"], answer:0, why:"A price taker sells each unit at the market price, so P = MR." },
  { u:8, d:2, type:"mc", concept:"profit maximization", prompt:"A competitive firm maximizes profit by producing the quantity where:", options:["price equals average total cost","marginal revenue equals marginal cost","marginal revenue equals zero","price is at its highest"], answer:1, why:"Profit is maximized where MR = MC for any firm; for a price taker that's P = MC." },
  { u:8, d:3, type:"mc", concept:"shutdown vs. exit", prompt:"In the SHORT run, a competitive firm should shut down if price falls below:", options:["average total cost","average variable cost","marginal cost","average fixed cost"], answer:1, why:"Shut down when P < AVC (can't cover variable costs). The P < ATC test is the long-run EXIT rule." },
  { u:8, d:3, type:"mc", concept:"long-run equilibrium", prompt:"In long-run competitive equilibrium, a typical firm earns economic profit that is:", options:["positive","zero","negative","as large as possible"], answer:1, why:"Free entry competes away profits until economic profit is zero (firms still earn a normal return)." },

  // Unit 9: imperfect competition
  { u:9, d:1, type:"mc", concept:"monopoly MR < P", prompt:"For a monopolist, marginal revenue is:", options:["equal to price, just like a competitive firm","less than price, because selling one more unit means lowering the price on all units","greater than price","always zero"], answer:1, why:"To sell an extra unit the monopolist must lower the price on all units, so MR < P. For a price-taking competitive firm, P = MR." },
  { u:9, d:2, type:"mc", concept:"monopoly pricing", prompt:"A monopolist finds its quantity where MR = MC, then sets the price by reading up to the:", options:["marginal revenue curve","demand curve","marginal cost curve","average cost curve"], answer:1, why:"Quantity comes from MR = MC, but the price the market will bear comes from the DEMAND curve; a classic mix-up." },
  { u:9, d:2, type:"mc", concept:"monopoly vs. competition", prompt:"A competitive market is taken over by a monopoly. Compared with competition, we expect price to ___, output to ___, and deadweight loss to ___.", options:["rise, fall, rise","fall, rise, fall","rise, rise, fall","fall, fall, rise"], answer:0, why:"A monopoly restricts output and raises price, creating deadweight loss." },
  { u:9, d:3, type:"mc", concept:"source of deadweight loss", prompt:"The deadweight loss from monopoly exists because:", options:["the firm earns a profit","output is held below the efficient level where price equals marginal cost","price equals marginal cost","consumers pay nothing"], answer:1, why:"By restricting output below the P = MC level, the monopoly forgoes mutually beneficial trades; that lost value is the DWL." },

  // Unit 10: externalities & public goods
  { u:10, d:1, type:"mc", concept:"negative externality", prompt:"A hog farm's runoff harms downstream neighbors who are never compensated. This is a:", options:["positive externality","negative externality","public good","price control"], answer:1, why:"A cost imposed on third parties outside the market is a negative externality." },
  { u:10, d:2, type:"mc", concept:"externality & efficiency", prompt:"When a good generates a negative externality, the free market tends to produce:", options:["too little of it","too much of it","exactly the efficient amount","none of it"], answer:1, why:"Because producers ignore the external cost, marginal social cost exceeds private cost and the market overproduces." },
  { u:10, d:2, type:"mc", concept:"Pigouvian tax", prompt:"A Pigouvian tax on a polluting good is designed to:", options:["ban the good outright","make producers face the social cost, cutting output toward the efficient level","increase producer surplus","subsidize more pollution"], answer:1, why:"The tax internalizes the external cost so the private choice lines up with the socially efficient quantity." },
  { u:10, d:3, type:"mc", concept:"public goods", prompt:"A public good is defined as being:", options:["rival and excludable","non-rival and non-excludable","always supplied by private firms","identical to a common resource"], answer:1, why:"Non-rival + non-excludable creates the free-rider problem, so public goods tend to be underprovided by markets." },

  // Unit 11: international trade
  { u:11, d:1, type:"mc", concept:"direction of trade", prompt:"If the world price of soybeans is ABOVE the U.S. no-trade (autarky) price, opening to trade means the U.S. will:", options:["export soybeans","import soybeans","stop producing soybeans","face a soybean shortage"], answer:0, why:"When the good fetches a higher price abroad, domestic producers sell to the world market: the country exports." },
  { u:11, d:2, type:"mc", concept:"direction of trade", prompt:"If the world price of a good is BELOW a country's no-trade (autarky) price, opening to trade means the country will:", options:["export the good","import the good","not trade at all","impose a price floor"], answer:1, why:"When the good is cheaper abroad, domestic buyers import it." },
  { u:11, d:2, type:"mc", concept:"winners and losers", prompt:"When a country begins importing a good, domestic:", options:["consumer surplus rises and producer surplus falls","producer surplus rises and consumer surplus falls","both surpluses fall","nothing changes"], answer:0, why:"The lower price helps consumers and hurts domestic producers, with a net gain overall." },
  { u:11, d:3, type:"mc", concept:"tariff deadweight loss", prompt:"A tariff on imports creates a deadweight loss because it:", options:["raises revenue for the government","distorts consumption and production away from the efficient free-trade levels","benefits consumers","lowers the domestic price"], answer:1, why:"The tariff pushes domestic price up, shrinking beneficial trades; the lost surplus not captured as revenue is the DWL." },
  { u:11, d:4, type:"num", concept:"tariff revenue", prompt:"With a $2-per-unit tariff in place, a country imports 40 units of a good. How much tariff revenue does the government collect, in dollars?", answer:80, tol:0.5, why:"Tariff revenue = tariff × imports = $2 × 40 = $80. That rectangle is revenue, not deadweight loss; the DWL triangles sit beside it." },

  // Unit 12: game theory
  { u:12, d:1, type:"mc", concept:"dominant strategy", prompt:"A dominant strategy is one that:", options:["is a player's best choice no matter what the other player does","is best only if the other player cooperates","maximizes the players' combined payoff","is never actually played"], answer:0, why:"A dominant strategy beats the alternatives regardless of the opponent's choice." },
  { u:12, d:2, type:"mc", concept:"Nash equilibrium", prompt:"In the classic prisoner's dilemma, the Nash equilibrium is:", options:["both players cooperate","both players defect","one cooperates, one defects","there is no equilibrium"], answer:1, why:"Defecting is a dominant strategy for each, so both defect; even though both would be better off cooperating." },
  { u:12, d:2, type:"mc", concept:"reading a payoff matrix", prompt:"Two seed dealers each choose High or Low advertising. If both choose Low, each earns $50k. If both choose High, each earns $30k. If one goes High alone, that dealer earns $70k and the other earns $20k. Each dealer's dominant strategy is:", options:["High, because it pays more no matter what the rival does","Low, because it pays more no matter what the rival does","High only if the rival chooses Low","there is no dominant strategy"], answer:0, why:"Check both cases: if the rival plays Low, High gives 70 > 50; if the rival plays High, High gives 30 > 20. High wins either way, even though both would prefer the both-Low outcome." },
  { u:12, d:3, type:"mc", concept:"tragedy of the commons", prompt:"Two farms each decide whether to over-pump a shared aquifer. Individually rational over-pumping that drains the aquifer for both is an example of:", options:["a cooperative dominant strategy","a prisoner's-dilemma / tragedy-of-the-commons outcome","a binding price ceiling","comparative advantage"], answer:1, why:"Each farm's self-interested choice makes both worse off: the commons version of the prisoner's dilemma." },
  { u:12, d:4, type:"mc", concept:"repeated games", prompt:"Cooperation is MOST likely to survive in a prisoner's dilemma when the game is:", options:["played exactly once between strangers","repeated indefinitely between the same players","played with hidden payoffs","impossible to punish defection in"], answer:1, why:"Repetition lets players punish defection in future rounds, so cooperating today becomes individually rational. One-shot games invite defection." }
];

QUESTIONS.forEach((q,i)=>{ q.id = "q"+i; });

/* ---- Tutor cold-start examples (unit = index into UNITS) ---- */
const EXAMPLES = [
  { unit:"router", mode:null,    text:"I don't know which model this question is asking for." },
  { unit:3, mode:"concept", text:"The price of milk rises. Is that a shift in demand or a movement along demand?" },
  { unit:4, mode:"graph",   text:"A price floor is set above equilibrium. Help me predict what happens." },
  { unit:1, mode:"concept", text:"What's the difference between opportunity cost and total economic cost?" },
  { unit:5, mode:"quiz",    text:"Quiz me on elasticity." },
  { unit:3, mode:"graph",   text:"A drought hits cattle ranchers. Help me draw the beef market." }
];
const EX_TAGS = { router:"Find the model", concept:"Concept", graph:"Graph", check:"Check reasoning", quiz:"Quiz", study:"Study", explain:"Why wrong" };

/* ---- Flaw detection: each statement has exactly one mistake.
   options[answer] names the flaw; the other three are plausible misdiagnoses. ---- */
const FLAWS = [
  { u:0, said:"A classmate", statement:"\"Raising farm subsidies would be good for rural towns, so that's a positive statement. It's about the economy.\"",
    options:["\"Would be good for\" is a value judgment, so the statement is normative","It is positive, but only if the subsidy amount is stated","Statements about government policy are always normative","It is positive because rural income can be measured"], answer:0,
    why:"Whether something is \"good\" is a value judgment. A positive statement makes a claim that could be checked against data, like \"higher subsidies raise rural incomes.\" The topic being the economy doesn't decide it." },
  { u:0, said:"A news anchor", statement:"\"Economists study scarcity, and right now there's a scarcity of eggs because stores can't keep them on the shelves.\"",
    options:["Empty shelves describe a shortage at the current price; scarcity is the permanent condition behind every choice","Eggs can't be scarce because hens keep laying","Scarcity only applies to natural resources, not food","Empty shelves mean demand has fallen"], answer:0,
    why:"A shortage is temporary and tied to a price below equilibrium. Scarcity never goes away: wants exceed what limited resources can produce, even when the market clears." },

  { u:1, said:"A student", statement:"\"I paid $15 for a concert ticket and skipped a $60 work shift, so my opportunity cost of going was $75.\"",
    options:["Opportunity cost is the next-best alternative, the $60 shift; $75 is the total economic cost","The ticket is a sunk cost, so the opportunity cost is $0","The opportunity cost is $15, since that's the money actually spent","The opportunity cost is $45, the shift minus the ticket"], answer:0,
    why:"Opportunity cost is the value of the single next-best alternative given up, here the $60 shift. Adding the $15 explicit cost gives total economic cost, $75. They answer different questions." },
  { u:1, said:"A roommate", statement:"\"Instead of this class I could have worked, gone to the gym, or slept. So the opportunity cost of class is the value of all three.\"",
    options:["Opportunity cost counts only the single next-best alternative, not every option given up","Opportunity cost only counts things that cost money, so the gym and sleep don't count","The opportunity cost is zero because tuition is already paid","The opportunity cost is the average value of the three options"], answer:0,
    why:"You could only have done one of those things with the hour. Opportunity cost is the value of the best one you passed up." },

  { u:2, said:"A policy blog", statement:"\"The U.S. can grow more wheat and more cotton per acre than Mexico, so the U.S. has the comparative advantage in both crops.\"",
    options:["Producing more of both is absolute advantage; comparative advantage depends on opportunity cost, and no country has it in both goods","The U.S. has comparative advantage in both, but Mexico can still gain from trade","Comparative advantage depends on which country has more land","Mexico has comparative advantage in both because its labor costs less"], answer:0,
    why:"Absolute advantage is about producing more. Comparative advantage is about the lower opportunity cost. With two goods, if one country gives up less of good B to make good A, the other gives up less of A to make B." },
  { u:2, said:"A trade negotiator", statement:"\"Eastland gives up 2 peaches to make an orange and Westland gives up 4. Trading at 5 peaches per orange benefits both.\"",
    options:["At 5 peaches, Westland pays more than its own cost of 4 to make an orange, so it loses; the terms must fall between 2 and 4","Any price works as long as both countries agree to it","The terms should equal the average, 3, or nobody gains","Eastland loses because it gives up peaches"], answer:0,
    why:"Westland could make its own orange for 4 peaches, so it won't pay 5. A deal helps both only when the terms of trade lie between the two opportunity costs, 2 and 4 peaches per orange." },

  { u:3, said:"A student", statement:"\"The price of milk went up, so the demand for milk decreased.\"",
    options:["A change in the good's own price changes quantity demanded, a movement along the curve; demand itself didn't change","Demand increased, because higher prices signal higher quality","The supply of milk decreased, not the demand","Price and demand always move in the same direction"], answer:0,
    why:"Own price moves you along the demand curve. \"Demand\" means the whole curve, and it shifts only when something other than the good's own price changes, like income or tastes." },
  { u:3, said:"A farm reporter", statement:"\"A record corn harvest shifted the demand for corn to the right, which is why corn prices fell.\"",
    options:["A bigger harvest shifts supply to the right; demand didn't move, and the supply shift is what lowers the price","Demand shifted left, which lowered the price","A demand shift to the right would lower the price, so the reasoning is fine","Harvest size affects quantity supplied, a movement along supply, not a shift"], answer:0,
    why:"A bumper crop is a production change, so the supply curve shifts right. Price falls and quantity rises along an unchanged demand curve. A rightward demand shift would raise the price." },
  { u:3, said:"A classmate", statement:"\"Incomes rose (beef is a normal good) and a drought hit ranchers at the same time. So the quantity of beef sold must go up.\"",
    options:["Demand shifts right but supply shifts left, so the quantity change is ambiguous; only the price rise is certain","Quantity must fall because the drought matters more","Both shifts raise quantity, so the claim is correct","Price is ambiguous and quantity must rise"], answer:0,
    why:"Both shifts push the price up. For quantity, the demand shift pushes it up and the supply shift pushes it down, so without knowing the sizes, the quantity change can't be signed." },

  { u:4, said:"A city council member", statement:"\"We set a price ceiling on bread at $6 a loaf. The market price is $4, so expect a bread shortage.\"",
    options:["A ceiling above the equilibrium price is non-binding; the market stays at $4 and no shortage appears","Any price ceiling causes a shortage","The ceiling will cause a surplus, not a shortage","The ceiling raises the price of bread to $6"], answer:0,
    why:"A ceiling is a legal maximum. It only binds when set below equilibrium. At $6 with the market at $4, nobody is constrained." },
  { u:4, said:"A study guide", statement:"\"Consumer surplus is the area above the price and below the supply curve.\"",
    options:["It uses the wrong curve: consumer surplus is the area below the demand curve and above the price","Consumer surplus is the whole area under the demand curve","That describes deadweight loss","That is correct for a price taker"], answer:0,
    why:"Consumer surplus is what buyers were willing to pay minus what they paid: the area below the demand curve and above the price. The area above the supply curve and below the price is producer surplus." },
  { u:4, said:"A student", statement:"\"With a $16 corn price floor and government purchases of the surplus, the only people who pay are consumers, through higher prices.\"",
    options:["Taxpayers also pay: the government spends the floor price times the surplus it buys","Producers pay, because they sell less corn","Nobody pays, because the government resells the corn at the floor price","Consumers don't pay, since the floor sits below equilibrium"], answer:0,
    why:"Consumers pay the higher price and buy less. The government buys the surplus (quantity supplied minus quantity demanded) at $16, and that bill falls on taxpayers." },

  { u:5, said:"A student", statement:"\"The price rose 10% and quantity demanded fell 20%, so demand is inelastic.\"",
    options:["The elasticity is −20/10 = −2, and an absolute value above 1 means demand is elastic","Demand is unit elastic because both numbers are multiples of 10","You can't tell without knowing the slope of the demand curve","Quantity falling means demand is perfectly elastic"], answer:0,
    why:"Price elasticity of demand = %ΔQ ÷ %ΔP = −20% ÷ 10% = −2. Its absolute value is greater than 1, so quantity responds more than proportionally: elastic." },
  { u:5, said:"A seller", statement:"\"Demand for our fertilizer is inelastic, so raising the price will lower our total revenue.\"",
    options:["With inelastic demand, price and total revenue move in the same direction, so revenue rises","Revenue falls whenever price rises","Revenue stays the same when demand is inelastic","Inelastic demand means buyers stop buying at a higher price"], answer:0,
    why:"Inelastic means the percent drop in quantity is smaller than the percent rise in price, so price × quantity goes up." },
  { u:5, said:"A homework answer", statement:"\"Price went from $10 to $12 and quantity went from 100 to 90, so the elasticity is −10 ÷ 2 = −5.\"",
    options:["It divides raw changes; elasticity uses percent changes from the starting values: −10% ÷ 20% = −0.5","It should use the ending values as the base","The sign should be positive","It should divide price by quantity, 2 ÷ −10"], answer:0,
    why:"Elasticity compares percent changes. From the starting values, %ΔQ = −10/100 = −10% and %ΔP = 2/10 = 20%, so elasticity = −0.5." },

  { u:6, said:"A shopper", statement:"\"The marginal utility of a taco is 40 and of a burrito is 30, so I should buy more tacos.\"",
    options:["You need marginal utility per dollar; without the prices you can't tell which gives more satisfaction per dollar","Always buy the good with the higher total utility","Buy more burritos, since lower marginal utility means it's cheaper","Marginal utility doesn't matter, only the budget does"], answer:0,
    why:"The rule is to equalize MU ÷ P across goods. If a taco costs $4 (10 per dollar) and a burrito $2 (15 per dollar), the burrito is the better buy." },
  { u:6, said:"A student", statement:"\"My marginal utility from each extra slice of pizza is falling, so my total utility is falling.\"",
    options:["Total utility still rises as long as marginal utility is positive; it falls only when marginal utility turns negative","Total and marginal utility always move together","Falling marginal utility means total utility is constant","Total utility falls only when price rises"], answer:0,
    why:"Each slice adds less than the one before, but it still adds something. Total utility keeps climbing until marginal utility drops below zero." },

  { u:7, said:"A farm manager", statement:"\"We hit diminishing marginal returns, so each new worker is now lowering our total output.\"",
    options:["Diminishing returns means each worker adds less, not that output falls; total output still rises while marginal product is positive","Diminishing returns only happens in the long run","It means average product is now zero","It means total output stopped changing"], answer:0,
    why:"Marginal product is shrinking but still positive, so total output keeps rising, just more slowly. Output falls only if marginal product turns negative." },
  { u:7, said:"A homework answer", statement:"\"With 3 workers the farm harvests 120 bushels and with 4 it harvests 150, so the 4th worker's marginal product is 150 ÷ 4 = 37.5 bushels.\"",
    options:["150 ÷ 4 is average product; marginal product is the change in output, 150 − 120 = 30","Marginal product is 150, the total with the 4th worker","Marginal product is 120 ÷ 3 = 40","Marginal product is the change in workers, 1"], answer:0,
    why:"Marginal product is the extra output from the added worker. Total divided by workers is average product." },

  { u:8, said:"A wheat farmer", statement:"\"Price is below my average total cost but above my average variable cost, so I'm losing money and should stop planting right away.\"",
    options:["In the short run, keep producing as long as price covers average variable cost; price below average total cost signals exit in the long run","Shut down whenever there's any loss","A price taker can raise the price to cover average total cost","Shut down only when price falls below marginal cost"], answer:0,
    why:"Fixed costs are paid either way in the short run. If price covers average variable cost, producing covers some fixed costs and loses less than shutting down. Exit happens in the long run if price stays below average total cost." },
  { u:8, said:"A farmer", statement:"\"My soybeans are top quality, so I'll sell them a dollar above the market price.\"",
    options:["In perfect competition the product is identical and the firm is a price taker; above the market price it sells nothing","He can charge more as long as he produces less","Price takers set price equal to average total cost","A higher price raises marginal revenue above the market price"], answer:0,
    why:"Buyers see identical soybeans from many sellers, so they buy elsewhere at the market price. A price taker's marginal revenue equals the market price." },

  { u:9, said:"A student", statement:"\"A monopolist produces where marginal revenue equals marginal cost and charges the price where MR = MC.\"",
    options:["The quantity comes from MR = MC, but the price is read up on the demand curve at that quantity","Monopolists set price equal to marginal cost","Monopolists produce where demand equals marginal cost","Price is read off the average cost curve"], answer:0,
    why:"MR = MC picks the quantity. The price is the most buyers will pay for that quantity, found on the demand curve, which sits above MR." },
  { u:9, said:"A classmate", statement:"\"The monopoly's profit is the deadweight loss.\"",
    options:["Profit is mostly surplus moved from consumers to the firm; deadweight loss is the value of trades that never happen because output is restricted","Deadweight loss is the firm's fixed costs","Monopolies have no deadweight loss because they earn a profit","Deadweight loss equals consumer surplus"], answer:0,
    why:"The higher price shifts surplus from buyers to the seller. That transfer isn't lost. Deadweight loss comes from the units that buyers valued above marginal cost but that the monopoly chose not to produce." },

  { u:10, said:"A student", statement:"\"Hog farm runoff harms people downstream, so the market produces too little pork.\"",
    options:["A negative externality puts social cost above private cost, so the market produces too much","Externalities only affect price, not quantity","The market produces the efficient amount if neighbors can sue","Too little pork is right because farmers must pay for cleanup"], answer:0,
    why:"Producers ignore the harm to neighbors, so their private cost is below the true social cost. They produce past the efficient quantity." },
  { u:10, said:"A beekeeper", statement:"\"My bees pollinate the orchards next door for free, so the market keeps too many hives.\"",
    options:["A positive externality puts social cost below private cost, so the market keeps too few hives; a subsidy could fix it","Free benefits mean the market is already efficient","Positive externalities cause overproduction","The orchards should be taxed"], answer:0,
    why:"The beekeeper bears the full cost but the orchard benefit isn't paid for, so marginal social cost is below marginal private cost. The market underproduces hives." },
  { u:10, said:"A textbook summary", statement:"\"National defense is a common resource, since everyone shares it.\"",
    options:["Defense is non-rival and non-excludable, a public good; common resources are rival, like fish in a lake","Defense is a private good provided by government","Common resources and public goods are the same thing","Defense is excludable because the government chooses who it protects"], answer:0,
    why:"One person's protection doesn't reduce anyone else's, so defense is non-rival. Common resources are rival: one boat's catch leaves fewer fish for others." },

  { u:11, said:"A student", statement:"\"The world price of soybeans is higher than the U.S. price, so once trade opens the U.S. will import soybeans.\"",
    options:["A higher world price draws U.S. soybeans abroad, so the U.S. exports","The U.S. imports because foreign soybeans are better","Trade won't happen while prices differ","The U.S. imports to push the world price down"], answer:0,
    why:"U.S. producers can sell for more on the world market, so domestic production rises, domestic purchases fall, and the gap is exported." },
  { u:11, said:"A study guide", statement:"\"The tariff revenue rectangle is part of the deadweight loss.\"",
    options:["Tariff revenue is a transfer to the government; deadweight loss is the two triangles beside the rectangle","Tariffs have no deadweight loss because the government collects revenue","Deadweight loss is the whole area under the world price","The rectangle is producer surplus"], answer:0,
    why:"Revenue is collected and can be spent, so it isn't lost. The deadweight loss comes from overproduction at home and the purchases consumers no longer make." },

  { u:12, said:"A classmate", statement:"\"In the prisoner's dilemma both players cooperate, because that gives them the best joint outcome.\"",
    options:["Each player's dominant strategy is to defect, so both defect; the best joint outcome isn't the equilibrium","Both cooperate in every repeated or one-shot game","One cooperates and one defects","There's no equilibrium in the prisoner's dilemma"], answer:0,
    why:"Whatever the other player does, defecting pays more. Each acting in self-interest lands on the worse joint outcome. That gap is the dilemma." },
  { u:12, said:"A student", statement:"\"Cooperating is my dominant strategy, since it's my best move when the other player cooperates.\"",
    options:["A dominant strategy is best no matter what the other player does, not just in one case","A dominant strategy maximizes the players' combined payoff","Dominant strategies only exist in repeated games","A dominant strategy is whatever the other player chooses"], answer:0,
    why:"You have to check both cases. A strategy is dominant only if it beats the alternative whether the other player cooperates or defects." }
];

/* ---- Explain why: free-text questions. key = what a strong answer contains (sent to the tutor only, shown after an attempt). ---- */
const EXPLAIN = [
  { u:0, prompt:"Is \"Farmers deserve higher crop prices\" a positive or a normative statement? Explain how you can tell.",
    key:"Normative. \"Deserve\" is a value judgment about what ought to be. A positive statement could be tested against evidence, for example \"Higher crop prices raise farm income.\"" },
  { u:1, prompt:"A friend says, \"Going to the football game cost me nothing because my ticket was free.\" Explain why an economist would disagree.",
    key:"The ticket had no explicit cost, but the game used time. The opportunity cost is the value of the next-best use of that time, such as hours of paid work or studying. So the game was not free, even with no money spent." },
  { u:2, prompt:"Explain how two countries can both gain from trade even if one of them can produce more of everything.",
    key:"Producing more of everything is absolute advantage. Gains come from comparative advantage: each country has a lower opportunity cost in some good. Each specializes in its lower-opportunity-cost good and trades at terms between the two opportunity costs, so both consume beyond their own production possibilities." },
  { u:3, prompt:"A drought kills part of the cattle herd. Explain what happens to the equilibrium price and quantity of beef, and say which curve moves and why.",
    key:"The supply curve shifts left because the drought reduces how much ranchers can produce at every price. Demand does not shift. Along the unchanged demand curve, the equilibrium price rises and the equilibrium quantity falls." },
  { u:4, prompt:"Explain why a binding price ceiling on apartment rent creates a shortage and a deadweight loss.",
    key:"Binding means the ceiling is below equilibrium. At the lower rent, quantity demanded exceeds quantity supplied, which is the shortage. Fewer apartments are rented than at equilibrium, so some renters who value an apartment above what it costs landlords to supply it never get one. The value of those missing trades is the deadweight loss." },
  { u:5, prompt:"A drought shrinks the wheat crop, yet total revenue for wheat farmers goes up. Explain how that can happen.",
    key:"Demand for wheat is inelastic. The supply decrease raises the price, and because demand is inelastic, the percent rise in price is larger than the percent fall in quantity. Total revenue, price times quantity, therefore rises." },
  { u:6, prompt:"Explain why a shopper shouldn't simply buy more of whichever good gives the highest marginal utility.",
    key:"Goods cost different amounts. The shopper should compare marginal utility per dollar (MU ÷ P) and shift spending toward the good with the higher MU per dollar until it is equal across goods, subject to the budget." },
  { u:7, prompt:"Explain why hiring more workers on a farm with a fixed amount of land eventually adds less and less output per worker hired.",
    key:"Land is fixed in the short run. Each added worker has less land and equipment to work with, so the marginal product of labor eventually falls. That is the law of diminishing marginal returns. Total output can still rise while marginal product is positive." },
  { u:8, prompt:"A farm's price covers its average variable cost but not its average total cost. Should it keep producing this season? Explain.",
    key:"Yes, in the short run. Fixed costs must be paid whether or not it produces. Because price covers average variable cost, producing pays all variable costs and part of the fixed costs, so the loss is smaller than if it shut down. If price stays below average total cost, the farm should exit in the long run." },
  { u:9, prompt:"Explain why a monopoly produces less than a competitive market would, and why that creates a deadweight loss.",
    key:"A monopolist's marginal revenue is below price, because selling one more unit means lowering the price on all units. It produces where MR = MC, a smaller quantity than where demand meets marginal cost, and charges the higher price read off demand. Units that buyers value above marginal cost go unproduced, and that lost value is the deadweight loss." },
  { u:10, prompt:"Explain why the market produces too much of a good that pollutes, and how a tax can fix it.",
    key:"Producers ignore the pollution cost to others, so marginal social cost is above marginal private cost. The market produces where demand meets marginal private cost, beyond the efficient quantity where demand meets marginal social cost. A per-unit tax equal to the external cost makes producers face the social cost and moves output to the efficient level." },
  { u:11, prompt:"When a country opens to trade and starts importing a good, who gains and who loses inside that country? Explain.",
    key:"The world price is below the domestic no-trade price, so the domestic price falls. Consumers gain consumer surplus by buying more at a lower price. Domestic producers lose producer surplus by selling less at a lower price. Consumers' gains exceed producers' losses, so the country gains overall." },
  { u:12, prompt:"Explain why two rational players in a prisoner's dilemma end up worse off than if they had cooperated.",
    key:"Each player's dominant strategy is to defect: whatever the other does, defecting pays more. So both defect, which is the Nash equilibrium. Both would be better off cooperating, but cooperation is not self-enforcing: even a player who expects the other to cooperate earns more by defecting, so individually rational choices produce a worse joint outcome." }
];

/* ---- More tools from the Dr. Tremendous collection, by unit ---- */
const TOOLS = [
  { u:1, name:"Drive-Thru Draft: Opportunity Cost", href:"../drive-thru-draft-oc.html", what:"Draft an item, rank what you passed up, and meet your real opportunity cost." },
  { u:1, name:"The Economic Profit Lab", href:"../economic-profit-lab.html", what:"Sort each cost as explicit or implicit, compute both profits, and see the hidden cost." },
  { u:3, name:"Supply & Demand Practice", href:"../supply-demand-practice.html", what:"Five levels from naming the curve to real 2026 news stories." },
  { u:3, name:"Supply & Demand Generator", href:"../supply-demand-generator.html", what:"A new practice problem at the click of a button." },
  { u:3, name:"The Sound of a Market", href:"../sound-toy.html", what:"Drag the price and hear shortage, surplus, and equilibrium." },
  { u:3, name:"The Whisper Market", href:"../whisper-market.html", what:"Plant a rumor and watch expectations move prices before the facts do." },
  { u:3, name:"Aisle Economics", href:"../aisle-economics.html", what:"Split a grocery price into farm share and marketing share." },
  { u:4, name:"Stakeholder Heatmap", href:"../stakeholder-heatmap.html", what:"Trace who gains and who bears the cost of a farm minimum wage." },
  { u:8, name:"The Drowning Skyline", href:"../drowning-skyline.html", what:"Raise the cost of staying in and watch which firms survive." },
  { u:10, name:"Every Tab for Itself", href:"../every-tab-for-itself.html", what:"Fish a shared pond across browser tabs, watch it collapse, then vote a quota." }
];

/* ---- Home screen entry points ---- */
const ENTRIES = [
  { tag:"Get help", title:"A concept isn't clicking", sub:"Talk it through with the tutor, one question at a time.", go:"tutor", mode:"concept" },
  { tag:"Get help", title:"I got a question wrong", sub:"Find exactly where the reasoning slipped.", go:"tutor", mode:"explain" },
  { tag:"Get help", title:"I don't know which model to use", sub:"The tutor helps you figure out what the problem is about.", go:"router" },
  { tag:"Practice", title:"I want practice", sub:"An adaptive quiz that meets you at your level.", go:"practice" },
  { tag:"Practice", title:"Test my understanding", sub:"Spot the flaw in a statement, or explain an idea in your own words.", go:"flaws" },
  { tag:"See it", title:"Show me the graph", sub:"Move the curves yourself and watch what happens.", go:"see-sd" }
];

/* ---- Tutor voice: Dr. Treme's style with students ---- */
const PERSONALITY = `YOUR VOICE: You speak like Dr. Treme with her students: a wry, warm economist. Plain talk, short sentences, dry humor. Humor always serves the economics and never replaces your one guiding question. Students can be the audience for a joke, never its target. When a student is close but not quite there, say what's right first, then point at the one shaky step.
SIGNATURE LINES (use each at most once per conversation, only when it truly fits, and never as filler):
- "In the long run, we're all dead." (Keynes.) Use it when the short run vs. long run distinction matters, such as short-run shutdown vs. long-run exit, fixed vs. variable costs, or why firms tolerate losses for a season. Follow it right away with the economic point.
- "Don't give up. Don't ever give up." (Jimmy V, NC State's own.) Use it when a student sounds discouraged, says they're lost or want to quit, or has made several honest attempts. Pair it with one small, doable next step.
- "Ceteris paribus. It's a hard c, not a soft c." Use it when holding everything else constant is the key move: separating a movement along a curve from a shift, isolating one change in a double-shift problem, or when a student lets two changes blur together. Say it once, then ask what is being held constant.
- "Left is less." Use it when a student mixes up the direction of a shift, especially a supply decrease: a leftward supply shift means less is offered at every price, even though the curve looks like it moved up. It works for demand too. Say it, then ask which way the curve moves.
- "There's no crying in economics." Use it ONLY for playful moments: a student grumbling about a sunk cost they can't recover, groaning at a deadweight loss, or protesting that a correct result "isn't fair." Follow it with the economic point. NEVER use it when a student sounds genuinely frustrated, anxious, or upset about their grade or ability; use the Jimmy V line or plain encouragement instead.
- "Ooh. This is a good one." Say it right before posing a fun or tricky challenge, such as a harder quiz question, a double-shift puzzle, or a problem where the obvious answer is wrong. Use it only for genuinely interesting questions so it keeps its meaning.
- "Who's ready for a celebration of learning?" This is how Dr. Treme refers to an exam. Use it to open an exam-study session (Study for an exam mode, or when a student says an exam is coming up), then go straight into the first practice question.`;
