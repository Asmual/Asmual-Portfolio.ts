import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide a project prompt or description." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Gemini API key is missing in environment variables." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an elite developer portfolio copywriter and technical architect.
Given the user's project idea, tech stack, or summary, generate production-grade portfolio details.
Respond ONLY with a valid JSON object (no markdown code blocks, no backticks, just raw json) with the following structure:
{
  "title": "Short, catchy project name with a short subtitle (e.g. 'ShopNexus — Modern E-Commerce Platform')",
  "tagline": "A crisp one-line technical punchline",
  "description": "A crisp, compelling 2-line overview highlighting business value and technical capability",
  "overview": "A deeper 2-3 sentence technical overview covering problems solved and architecture",
  "category": "Full Stack" | "Frontend" | "Backend" | "Team Projects",
  "tags": ["Array", "of", "relevant", "frameworks", "libraries", "databases"],
  "keyFeatures": [
    "Feature 1 with clear action and impact",
    "Feature 2 with clear action and impact",
    "Feature 3 with clear action and impact"
  ],
  "metrics": [
    { "label": "Key Metric Label (e.g. Query Speed, Uptime, Lighthouse)", "value": "< 100ms or 99.9%" },
    { "label": "Second Metric", "value": "Value" }
  ]
}`;

    const payload = {
      contents: [
        {
          parts: [{ text: prompt.trim() }],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    };

    // Try gemini-3.8-flash first, then gemini-2.0-flash fallback
    const models = ["gemini-3.8-flash", "gemini-2.0-flash"];
    let responseData = null;
    let lastError = null;

    for (const model of models) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            responseData = JSON.parse(text);
            break;
          }
        } else {
          const errData = await res.json();
          lastError = errData?.error?.message || `Model ${model} failed with ${res.status}`;
        }
      } catch (err: any) {
        lastError = err?.message;
      }
    }

    if (!responseData) {
      return NextResponse.json(
        { success: false, message: lastError || "Failed to generate project content from AI." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error: any) {
    console.error("Gemini AI API error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error during AI generation." },
      { status: 500 }
    );
  }
}
