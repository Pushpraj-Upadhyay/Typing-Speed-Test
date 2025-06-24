export default async function handler(req, res) {
  // Enable CORS for all origins (you can restrict this to your domain later)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    // Get the API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // Parse request body
    const { prompt, difficulty = "medium", wordCount = 100 } = req.body || {};

    // Create a custom prompt based on parameters
    const customPrompt =
      prompt ||
      `Generate a ${difficulty} difficulty paragraph for typing practice. 
       The paragraph should be around ${wordCount} words long, 
       grammatically correct, and engaging. 
       Topics can include technology, science, history, literature, or general knowledge. 
       Avoid special characters and focus on common punctuation. 
       Make it suitable for improving typing speed and accuracy.`;

    // Prepare request body for Gemini API
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: customPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    };

    // Make request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      requestBody
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error(
        "No text generated. API Response:",
        JSON.stringify(data, null, 2)
      );
      throw new Error("No text generated from Gemini API");
    }

    // Clean up the text (remove extra whitespace, ensure proper formatting)
    const cleanedText = generatedText
      .trim()
      .replace(/\n\s*\n/g, " ") // Replace multiple newlines with space
      .replace(/\s+/g, " "); // Replace multiple spaces with single space

    // Return success response
    res.status(200).json({
      success: true,
      paragraph: cleanedText,
      wordCount: cleanedText.split(" ").length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in generate-paragraph function:", error);

    // Return error response
    res.status(500).json({
      success: false,
      error: "Failed to generate paragraph",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
