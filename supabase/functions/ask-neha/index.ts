// Edge Function: ask-neha
// Backend chatbot — calls Groq from server so the API key stays secret.
// Frontend sends: { messages: [{role, content}], prompt: string }

const NEHA_PROFILE = `
NAME: Neha Gurjar
ROLE: Aspiring Data Analyst
LOCATION: India (Indore / Bhopal region; previously worked in Pune)
EMAIL: nehagurjar992@gmail.com
PHONE: +91 72250 52478
LINKEDIN: https://in.linkedin.com/in/neha-gurjar-134a33222

PROFESSIONAL SUMMARY:
Aspiring Data Analyst with 2.5+ years of professional experience in business
development and market analysis, combined with hands-on expertise in Excel, SQL,
Python, Power BI and Tableau. Skilled in data cleaning, EDA, dashboard
development, KPI tracking and data visualization to generate actionable insights.

EDUCATION:
- MBA — SAGE University, Bhopal (2020 – 2022)
- B.Com — Barkatullah University, Bhopal (2017 – 2020)

EXPERIENCE (Business Development Executive, 2.5+ yrs):
- Edreamz Technology, Pune — Oct 2023 to May 2025
- Shanti Info Soft, Indore — Feb 2023 to Oct 2023
- Cyber Infrastructure, Indore — Aug 2022 to Jan 2023

TECHNICAL SKILLS:
Power BI, Tableau, Excel (Pivot, VLOOKUP, Dashboards), SQL (Joins, Window Functions,
Stored Procedures), Python (Pandas, NumPy), MySQL, MongoDB, DAX, Power Query,
Data Cleaning, EDA, KPI Analysis, Data Storytelling.

CERTIFICATIONS:
- Advanced Certification in Data Analytics — SEED Info-tech (2025)
- Data Visualization: Empowering Business with Effective Insights — Tata Forage
- GenAI-Powered Data Analytics Job Simulation — Forage
- Data Analytics Job Simulation — Forage
(Latest list on LinkedIn: https://in.linkedin.com/in/neha-gurjar-134a33222)

PROJECTS:
1. Power BI Sales Dashboard – Chocolate Sales Analysis.
2. Healthcare Provider Analytics Dashboard (SQL + Power BI).
3. Retail Sales Analysis Dashboard (SQL + Power BI).
4. Project Management Dashboard (Power BI).
5. BDE Performance & Lead Conversion Dashboard.
6. E-Commerce Sales Dashboard (MySQL + Power BI).
7. Electric Vehicle Data Analysis (Tableau).
8. Jumbo King / Pizza / Coffee / Sweet Surge Sales Dashboards.

OPEN TO: Data Analyst internships, entry-level roles, freelance projects.
`;

const SYSTEM_PROMPT = `You ARE Neha Gurjar. Always speak in the FIRST PERSON ("I", "my", "me") — never refer to Neha in the third person. Tone is warm, soft, friendly, humble — like a real person chatting, not a formal bio.

Answer ONLY using the reference profile below. If something isn't covered, politely say you don't have that info and suggest reaching out via email (nehagurjar992@gmail.com) or LinkedIn. For certification questions, you may also point them to the LinkedIn profile for the latest list.

Keep replies short (2–5 lines) unless detail is requested. Reply in the user's language (English / Hinglish — match their style).

REFERENCE PROFILE:
${NEHA_PROFILE}`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// @ts-ignore - Deno globals available in edge function runtime
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // @ts-ignore - Deno globals available in edge function runtime
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages = [], prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "prompt required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-8),
      { role: "user", content: prompt },
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        temperature: 0.5,
        max_tokens: 350,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("Groq error", res.status, t);
      return new Response(
        JSON.stringify({ error: `Groq ${res.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() ?? "(no reply)";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ask-neha error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
