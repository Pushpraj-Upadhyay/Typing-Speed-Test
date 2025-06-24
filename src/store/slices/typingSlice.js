import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for generating text from AI
export const generateText = createAsyncThunk(
  "typing/generateText",
  async (difficulty = "medium") => {
    const fallbackTexts = {
      easy: [
        "It was raining outside, and Lily sat by the window with a cup of warm milk. She watched raindrops race down the glass. The sound of rain made her feel cozy. She opened her book and read a new adventure. Her cat curled up beside her, purring softly. Rainy days were her favorite because they felt peaceful. She didn't need sunshine to enjoy her time indoors with stories.",
        "A boy named Tim loved building toy houses. He used wooden blocks, glue, and lots of patience. One day, he made the tallest tower he ever built. His sister clapped with joy. Suddenly, their cat jumped and knocked it over. Tim laughed instead of getting upset. He knew he could build it again. Mistakes didn't bother him. He just loved creating, learning, and playing with his imagination.",
        "The sky was bright blue, and the birds sang happily. A girl walked her dog through the park, smiling as the wind gently blew through her hair. Children played nearby, laughing and chasing bubbles. Flowers bloomed in every color. The dog wagged its tail and sniffed the fresh air. Everything felt calm and peaceful, like a perfect day. She wished every morning could feel just like this one.",
        "Ben and his dad went fishing early in the morning. The lake was quiet, and the water sparkled in the sun. Birds flew low over the surface. Ben caught his first fish and was thrilled. They laughed and shared sandwiches. Even though they didn't catch many fish, it was the best day. Spending time together made it special. Ben promised to go again next weekend without missing it.",
        "Sara loved helping her mom in the kitchen. She mixed batter, shaped cookies, and licked the spoon when allowed. The oven filled the house with sweet smells. When the cookies were ready, they were golden brown and warm. Sara carefully placed them on a plate. Her dad tasted one and gave a big thumbs up. Baking made her happy, not just for the treats, but for the fun moments together.",
        "Every evening, Grandpa told stories from his youth. He talked about walking miles to school, climbing mango trees, and playing outside until dark. The children listened closely, wide-eyed. They laughed at the funny parts and asked lots of questions. Grandpa's stories brought the past to life. He said, “Stories keep us connected.” The kids always looked forward to his tales, more than any show or phone game could ever offer.",
        "The school picnic was held at a big green park. Students played games, ate sandwiches, and had fun. Balloons floated, and music played. Teachers joined the races, and everyone cheered. A surprise ice cream truck arrived, making the day even better. After lunch, they relaxed under shady trees. The bus ride back was full of sleepy smiles. It was a day full of joy, laughter, and memories to remember forever.",
      ],
      medium: [
        "The forest echoed with distant bird calls and the rustling of leaves. A group of hikers followed a narrow trail, stepping over roots and rocks. Sunlight filtered through the trees, creating golden patterns on the ground. One of them stopped to photograph a rare flower. It was a perfect blend of exploration and peace. Each breath of fresh air made them feel more alive, connected to nature's quiet power.",
        "Sophia's science experiment involved growing crystals using saltwater and string. She recorded each day's progress in a notebook, noting changes in shape and color. By the end of the week, beautiful crystals formed along the string, sparkling under sunlight. Her classmates gathered around, curious and amazed. Presenting her findings with confidence, Sophia felt proud. It wasn't just about science—it was about patience, curiosity, and the joy of learning something new.",
        "The city was buzzing with excitement as the festival began. Streets were decorated with lanterns and banners, and food stalls lined the sidewalks. Music filled the air as performers danced in traditional costumes. Children laughed as they played games and won colorful prizes. For one weekend, people forgot their worries and celebrated together. Culture, tradition, and joy came alive, uniting strangers into a community of shared happiness and memories.",
        "At sunrise, the fisherman cast his net into the still waters. The lake reflected the orange sky like a mirror. He worked silently, guided by years of experience and instinct. Each movement was deliberate, shaped by routine and respect for nature. As the boat rocked gently, he pulled in his catch, grateful for the morning's reward. It was a life of simplicity, yet full of purpose and quiet satisfaction.",
        "Leah was fascinated by stars and planets. She spent hours reading astronomy books and using a small telescope to observe the night sky. On clear nights, she could spot Jupiter's moons and the rings of Saturn. Her dream was to become an astronomer and study distant galaxies. Looking up at the universe made her problems seem smaller. The sky wasn't just full of stars—it was full of dreams waiting to be chased.",
        "Daniel trained daily for the upcoming marathon. He followed a strict routine of running, eating healthy, and resting properly. Some mornings were tough, especially when it rained or he felt tired. But he reminded himself of his goal. The race wasn't just about winning—it was about discipline, endurance, and self-belief. Each step brought him closer to the finish line, not just in the race, but in his personal growth too.",
        "The library was a quiet escape from the noisy streets. Rows of books stood like silent guardians of knowledge. Emily wandered through the aisles, her fingers tracing spines of novels, biographies, and history books. She selected a mystery novel and settled into a corner chair. Time slipped by unnoticed as she turned each page. For her, the library wasn't just a building—it was a sanctuary of stories and imagination.",
      ],
      hard: [
        "Beneath the surface of scientific discovery lies a relentless pursuit of truth, often shrouded in uncertainty and complexity. Researchers meticulously analyze data, challenge established theories, and endure failure repeatedly. The process isn't linear—it demands resilience, collaboration, and an insatiable curiosity. Each breakthrough, no matter how small, represents the culmination of countless invisible efforts. It is through this iterative journey that knowledge expands and humanity pushes the boundaries of understanding.",
        "The fabric of modern society is woven with threads of technological dependence, often blurring the line between convenience and control. As algorithms dictate content, preferences, and even decisions, individuals unknowingly surrender autonomy in exchange for efficiency. The paradox lies in the very tools designed to liberate us, subtly reshaping behaviors. In a world governed by digital systems, the challenge becomes not access to information, but discerning truth from manipulation.",
        "Art, in its most profound form, transcends visual appeal to provoke thought and evoke emotion. A single brushstroke or phrase can capture centuries of struggle, joy, or identity. It serves as a mirror to society, reflecting its triumphs and failures with unfiltered honesty. While beauty may lie in the eye of the beholder, meaning often lies buried in interpretation. True artistry challenges perception and invites introspection beyond surface admiration.",
        "Globalization, once heralded as the gateway to unity and progress, now stands at a crossroads amid rising nationalism and economic disparity. While borders blur for trade and communication, inequalities deepen across regions and populations. The interconnectedness that promises opportunity simultaneously spreads disruption. Balancing cultural identity with global cooperation requires thoughtful policy, empathy, and adaptive governance. Without it, integration risks becoming fragmentation wrapped in the illusion of collective advancement.",
        "The nature of memory is inherently fallible, shaped as much by emotion and perspective as by fact. Recollections shift over time, colored by personal bias and selective focus. What we remember is often not a replica of reality, but a reconstruction that aligns with our internal narrative. This imperfection, while frustrating, is also what makes memory human—fluid, subjective, and deeply intertwined with identity and lived experience.",
        "Philosophy demands not answers, but better questions. In exploring morality, existence, and consciousness, philosophers confront ambiguity without fear. The absence of concrete conclusions is not failure, but freedom—a space where thought evolves unbound. Unlike empirical disciplines, its strength lies in contemplation and critique. To engage philosophically is to accept complexity, entertain paradox, and wrestle with ideas that lack resolution. In doing so, we enrich our capacity for wisdom.",
        "Climate change is not merely an environmental issue—it is a multifaceted crisis affecting health, security, and justice. Its impact disproportionately burdens vulnerable communities, revealing deep societal inequities. Addressing it demands more than innovation; it requires a fundamental shift in values and priorities. Mitigation must be matched by adaptation, and science must intersect with policy. The future depends not just on awareness, but on coordinated, equitable, and urgent action.",
      ],
    };
    return fallbackTexts[difficulty][
      Math.floor(Math.random() * fallbackTexts[difficulty].length)
    ];
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
