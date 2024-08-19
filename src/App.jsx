import { useId, useState } from "react";
import "./App.css";
import ColorComponent from "./Components/Color/Color";
import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    const newColorWithId = { ...newColor, id: nanoid() };

    setColors([newColorWithId, ...colors]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />
      <ul className="color-list">
        {colors.map((color) => (
          <li key={color.id}>
            <ColorComponent color={color} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
