import "./App.css";
import ColorComponent from "./Components/Color/Color";
import { initialColors } from "./lib/colors";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      <ul>
        {initialColors.map((color) => (
          <li key={color.id}>
            <ColorComponent color={color} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
