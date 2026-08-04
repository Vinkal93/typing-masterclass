const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODEL = "google/gemini-3.6-flash";

async function callAI(messages: unknown[], jsonMode = true) {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: MODEL,
      messages,
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    return { error: text, status: res.status };
  }
  const data = await res.json();
  return { content: data.choices?.[0]?.message?.content ?? "" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const action = body.action as string;

    if (action === "generate") {
      const { category = "Medium", language = "English", words = 120 } = body;
      const r = await callAI([
        {
          role: "system",
          content:
            "You generate typing-practice paragraphs. Return JSON: {\"text\": string}. No markdown, no headings, plain prose only.",
        },
        {
          role: "user",
          content: `Write a ${language} typing practice passage of about ${words} words in the category "${category}". It must be natural, coherent, and grammatically perfect.`,
        },
      ]);
      if ("error" in r) return new Response(JSON.stringify({ error: r.error }), { status: r.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(r.content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "analyze") {
      const { reference = "", typed = "" } = body;
      const r = await callAI([
        {
          role: "system",
          content:
            'You are a typing & language analyst. Compare the TYPED text against the REFERENCE text. Return strict JSON: {"errors":[{"word":string,"expected":string,"reason":string,"suggestion":string,"type":"grammar|spelling|capitalization|spacing|punctuation|missing|extra|word-usage|context|tense|article|preposition|duplicate|sequence"}]}. Only report meaningful issues (max 25). Never report a word twice.',
        },
        { role: "user", content: `REFERENCE:\n${reference.slice(0, 4000)}\n\nTYPED:\n${typed.slice(0, 4000)}` },
      ]);
      if ("error" in r) return new Response(JSON.stringify({ error: r.error }), { status: r.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(r.content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "paper") {
      const { typed = "" } = body;
      const r = await callAI([
        {
          role: "system",
          content:
            'You are a typing examiner for PAPER MODE: the candidate typed from a printed page, so there is no digital reference. Judge ONLY the typed text on spelling, grammar, punctuation, capitalization and spacing. Return strict JSON: {"accuracy":number,"totalWords":number,"wrongWords":number,"errors":[{"word":string,"expected":string,"reason":string,"suggestion":string,"type":"grammar|spelling|capitalization|spacing|punctuation|word-usage|tense|article|preposition|duplicate"}]}. accuracy = (totalWords - wrongWords) / totalWords * 100, rounded to 1 decimal. Max 30 errors, never repeat a word.',
        },
        { role: "user", content: `TYPED TEXT:\n${String(typed).slice(0, 6000)}` },
      ]);
      if ("error" in r) return new Response(JSON.stringify({ error: r.error }), { status: r.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(r.content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "coach") {

      const { stats = {}, errors = [], weakKeys = [] } = body;
      const r = await callAI([
        {
          role: "system",
          content:
            'You are an elite typing coach. Return strict JSON: {"overallScore":number,"typingScore":number,"grammarScore":number,"readability":number,"sentenceQuality":number,"professionalScore":number,"weakKeys":string[],"weakWords":string[],"weakGrammarTopics":string[],"suggestions":string[],"dailyPractice":string,"estimatedImprovementTime":string}. Scores 0-100.',
        },
        {
          role: "user",
          content: `Session stats: ${JSON.stringify(stats)}\nWeak keys: ${JSON.stringify(weakKeys)}\nErrors: ${JSON.stringify((errors as unknown[]).slice(0, 30))}`,
        },
      ]);
      if ("error" in r) return new Response(JSON.stringify({ error: r.error }), { status: r.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(r.content, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
