import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for generating text from AI
export const generateText = createAsyncThunk(
  "typing/generateText",
  async (difficulty = "medium") => {
    const prompts = {
      easy: "Generate a simple, random and differnt paragraph with common words for typing practice, around 100 words.",
      medium:
        "Generate a paragraph with moderate vocabulary and randomness for typing practice, around 100 words.",
      hard: "Generate a complex paragraph with advanced vocabulary and punctuation for typing practice, around 100 words.",
    };

    try {
      const response = await fetch("/api/generate-paragraph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompts[difficulty],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate text");
      }

      const data = await response.json();
      return data.text;
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

const initialState = {
  currentText: "",
  userInput: "",
  startTime: null,
  endTime: null,
  isActive: false,
  isFinished: false,
  wpm: 0,
  accuracy: 100,
  errors: 0,
  currentIndex: 0,
  difficulty: "medium",
  isLoading: false,
  error: null,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
      state.currentIndex = action.payload.length;

      // Start timer on first keystroke
      if (!state.isActive && action.payload.length === 1) {
        state.isActive = true;
        state.startTime = Date.now();
      }

      // Calculate real-time stats
      if (state.isActive) {
        const timeElapsed = (Date.now() - state.startTime) / 1000 / 60; // minutes
        const wordsTyped = action.payload.trim().split(" ").length;
        state.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

        // Calculate accuracy
        let correctChars = 0;
        for (let i = 0; i < action.payload.length; i++) {
          if (action.payload[i] === state.currentText[i]) {
            correctChars++;
          }
        }
        state.accuracy =
          action.payload.length > 0
            ? Math.round((correctChars / action.payload.length) * 100)
            : 100;
        state.errors = action.payload.length - correctChars;
      }

      // Check if test is finished
      if (action.payload === state.currentText) {
        state.isFinished = true;
        state.isActive = false;
        state.endTime = Date.now();
      }
    },
    resetTest: (state) => {
      state.userInput = "";
      state.startTime = null;
      state.endTime = null;
      state.isActive = false;
      state.isFinished = false;
      state.wpm = 0;
      state.accuracy = 100;
      state.errors = 0;
      state.currentIndex = 0;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateText.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateText.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentText = action.payload;
        state.userInput = "";
        state.currentIndex = 0;
        state.isActive = false;
        state.isFinished = false;
        state.startTime = null;
        state.endTime = null;
        state.wpm = 0;
        state.accuracy = 100;
        state.errors = 0;
      })
      .addCase(generateText.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserInput, resetTest, setDifficulty } = typingSlice.actions;
export default typingSlice.reducer;
