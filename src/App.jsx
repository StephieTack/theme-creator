import "./App.css";
import ColorComponent from "./Components/Color/Color";
import { initialColors } from "./lib/colors";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      {initialColors.map((color) => {
        return <ColorComponent key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
