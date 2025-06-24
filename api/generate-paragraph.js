// api/generate-paragraph.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
          responseMimeType: "application/json",
        },
      }
    );

    const data = await geminiRes.json();

    const generatedText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.status(200).json({ text: generatedText });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
