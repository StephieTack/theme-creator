import "./App.css";
import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";
import ColorComponent from "./Components/ColorComponent/ColorComponent";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(colorData) {
    const colorDataWithId = { ...colorData, id: nanoid() };
    setColors([colorDataWithId, ...colors]);
  }

  function handleDeleteColor(idToDelete) {
    setColors(colors.filter((colorObject) => colorObject.id !== idToDelete));
  }

  function handleEditColor(idToUpdate, updatedColor) {
    // const foundColor = colors.find(function (colorObject) {
    //   return colorObject.id === idToUpdate;
    // });
    // setColors([foundColor]);
    const updatedColors = colors.map(function (color) {
      if (color.id === idToUpdate) {
        return {
          ...color,
          ...updatedColor,
        };
      } else {
        return color;
      }
    });

    setColors(updatedColors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {colors.length === 0 ? (
        // message when there is no color in the theme:
        <p>No colors.. start by adding one!</p>
      ) : (
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
      )}
    </>
  );
}

export default App;
