import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateText = createAsyncThunk(
  "typing/generateText",
  async (difficulty = "medium") => {
    const prompts = {
      easy: "Generate a simple paragraph with common words for typing practice, around 50 words.",
      medium:
        "Generate a paragraph with moderate vocabulary for typing practice, around 75 words.",
      hard: "Generate a complex paragraph with advanced vocabulary and punctuation for typing practice, around 100 words.",
    };

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCkhKPzrIwEfyW1WW26VGB3rYgcaAWP3uQ",
        {
          contents: [
            {
              parts: [
                {
                  text: prompts[difficulty],
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

      if (!response.ok) {
        throw new Error("Failed to generate text");
      }

      const data = await response.json();
      console.log(data.text);
      //   return data.text;
    } catch (error) {
      // Fallback text if API fails
      const fallbackTexts = {
        easy: "The quick brown fox jumps over the lazy dog. This is a simple sentence for typing practice.",
        medium:
          "Technology has revolutionized the way we communicate and work in modern society. Digital transformation continues to shape our daily lives.",
        hard: "Artificial intelligence and machine learning algorithms are fundamentally transforming computational paradigms across diverse industries and applications.",
      };
      return fallbackTexts[difficulty];
    }
  }
);
