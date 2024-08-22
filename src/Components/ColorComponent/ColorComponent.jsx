import ColorForm from "../ColorForm/ColorForm";
import "./ColorComponent.css";
import { useState } from "react";

export default function ColorComponent({ colora, onDeleteColor, onEditColor }) {
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const [editColor, setEditColor] = useState(colora);
  //   //ist usestate colora korrekt?

  function handleEditButton() {
    console.log("testing the handleeditbutton function");
    // works
    setEditColor;
  }

  return (
    <div
      className="color-card"
      style={{
        background: colora.hex,
        color: colora.contrastText,
      }}
    >
      <h3 className="color-card-headline">{colora.hex}</h3>
      <h4>{colora.role}</h4>
      <p>contrast: {colora.contrastText}</p>
      {showExtraButtons ? (
        <>
          <p className="color-card-highlight">Really delete?</p>
          <button onClick={() => setShowExtraButtons(false)}>Cancel</button>
          <button onClick={() => onDeleteColor(colora.id)}>Delete</button>
        </>
      ) : (
        <button onClick={() => setShowExtraButtons(!showExtraButtons)}>
          delete
        </button>
      )}
      <button onClick={handleEditButton}>EDIT</button>
    </div>
  );
}

// onClick={
// () => onEditColor(colora.hex, colora.contrastText, colora.role)
//stimmen die übergaben?
// }
