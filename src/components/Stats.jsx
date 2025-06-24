import { useSelector } from "react-redux";

export default function Stats() {
  const { wpm, accuracy, errors, isActive, isFinished } = useSelector(
    (state) => state.typing
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">{wpm}</div>
        <div className="text-sm text-gray-600">WPM</div>
      </div>

      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
        <div className="text-sm text-gray-600">Accuracy</div>
      </div>

      <div className="text-center p-4 bg-red-50 rounded-lg">
        <div className="text-2xl font-bold text-red-600">{errors}</div>
        <div className="text-sm text-gray-600">Errors</div>
      </div>

      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-2xl font-bold text-gray-600">
          {isFinished ? "✓" : isActive ? "⏱️" : "⏸️"}
        </div>
        <div className="text-sm text-gray-600">Status</div>
      </div>
    </div>
  );
}
