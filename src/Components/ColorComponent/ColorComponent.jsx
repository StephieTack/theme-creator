import "./ColorComponent.css";
import { useState } from "react";

export default function ColorComponent({ colora, onDeleteColor }) {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  // nun direkt im Button als Arrowfunction enthalten
  // function handleToggleExtraButtons(){
  // setShowExtraButtons(!showExtraButtons)}

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
    </div>
  );
}
