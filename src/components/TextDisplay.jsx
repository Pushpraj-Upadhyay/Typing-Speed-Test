import { useSelector } from "react-redux";

export default function TextDisplay() {
  const { currentText, userInput, currentIndex } = useSelector(
    (state) => state.typing
  );

  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = "text-lg ";

      if (index < userInput.length) {
        // Character has been typed
        if (userInput[index] === char) {
          className += "bg-green-200 text-green-800"; // Correct
        } else {
          className += "bg-red-200 text-red-800"; // Incorrect
        }
      } else if (index === currentIndex) {
        className += "bg-blue-200 text-blue-800 animate-pulse"; // Current character
      } else {
        className += "text-gray-700"; // Not yet typed
      }

      return (
        <span key={index} className={className}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Text to type :
      </h3>
      <div className="flex flex-wrap p-4 bg-gray-50 rounded-lg border-2 border-gray-200 min-h-[120px] leading-relaxed">
        {currentText ? renderText() : "Loading text..."}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Progress: {userInput.length} / {currentText.length} characters
      </div>
    </div>
  );
}
