import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  setUserInput,
  resetTest,
  generateText,
  setDifficulty,
} from "../store/slices/typingSlice.js";
import Stats from "../components/Stats.jsx";
import TextDisplay from "../components/TextDisplay.jsx";
import Controls from "../components/Controls.jsx";

export default function TypingTest() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const {
    currentText,
    userInput,
    isActive,
    isFinished,
    difficulty,
    isLoading,
    error,
  } = useSelector((state) => state.typing);

  useEffect(() => {
    // Generate initial text
    dispatch(generateText(difficulty));
  }, [dispatch, difficulty]);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    if (!isFinished) {
      dispatch(setUserInput(e.target.value));
    }
  };

  const handleReset = () => {
    dispatch(resetTest());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleNewText = () => {
    dispatch(generateText(difficulty));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleDifficultyChange = (newDifficulty) => {
    dispatch(setDifficulty(newDifficulty));
    dispatch(generateText(newDifficulty));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating new text...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => dispatch(generateText(difficulty))}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Typing Speed Test
          </h1>
          <p className="text-gray-600">
            Test your typing speed and accuracy with AI-generated content
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Controls
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onReset={handleReset}
            onNewText={handleNewText}
            isActive={isActive}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Stats />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <TextDisplay />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <label
            htmlFor="typing-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Start typing here:
          </label>
          <textarea
            id="typing-input"
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            placeholder="Click here and start typing..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
            disabled={isFinished}
          />
          {isFinished && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">
                🎉 Test completed! Great job!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
