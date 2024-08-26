import "./App.css";
import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";
import ColorComponent from "./Components/ColorComponent/ColorComponent";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";

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

  // function handleContrastCheck(color) {
  //   async function postFetch() {
  //     const dataObject = {
  //       colors: [color.hex, color.contrastText],
  //     };
  //     console.log("dataObject:", dataObject);
  //     console.log("Log out of function handleContrastCheck");
  //     const response = await fetch(
  //       "https://www.aremycolorsaccessible.com/api/are-they",
  //       {
  //         method: "POST",
  //         body: JSON.stringify(dataObject),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const responseData = await response.json();
  //     console.log("Response Data:", responseData);
  //     console.log("Response Data - value:overall:", responseData.overall);
  //     return responseData.overall;
  //   }

  //   postFetch();
  // }

  async function handleContrastCheck(color) {
    // dataObject: handling an object with two values to the api
    const dataObject = {
      colors: [color.hex, color.contrastText],
    };
    console.log("dataObject:", dataObject);

    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        body: JSON.stringify(dataObject),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    console.log("responseData:", responseData);
    console.log("responseData.overall:", responseData.overall);

    // result from the api
    return responseData;
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
                onFetch={handleContrastCheck}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
