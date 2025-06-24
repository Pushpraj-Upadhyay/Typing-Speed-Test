import { Provider } from "react-redux";
import "./App.css";
import TypingTest from "./pages/TypingTest";
import { store } from "./store/store.js";

function App() {
  return (
    <Provider store={store}>
      <TypingTest />
    </Provider>
  );
}

export default App;
