import { useState } from "react";
import "./App.css";
import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";
import ColorComponent from "./Components/ColorComponent/ColorComponent";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(colorData) {
    const colorDataWithId = { ...colorData, id: nanoid() };
    setColors([colorDataWithId, ...colors]);
  }

  function handleDeleteColor(idToDelete) {
    setColors(colors.filter((colorObject) => colorObject.id !== idToDelete));
  }

  function handleEditColor(colorData) {
    console.log("mytest");
    // setEditColor(colorData);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {/* {colors.length === 0 ? (
        <p>No colors.. start by adding one!</p> // Nachricht, wenn alle Farben gelöscht sind
      ) : ( */}
      <ul className="color-list">
        {colors.map((colorNachMapping) => (
          <li key={colorNachMapping.id}>
            <ColorComponent
              colora={colorNachMapping}
              onDeleteColor={handleDeleteColor}
              onEditColor={handleEditColor}
            />
          </li>
        ))}
      </ul>
      {/* )} */}
    </>
  );
}

export default App;
