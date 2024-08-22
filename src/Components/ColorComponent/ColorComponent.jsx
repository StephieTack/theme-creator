import ColorForm from "../ColorForm/ColorForm";
import "./ColorComponent.css";
import { useState } from "react";

export default function ColorComponent({ colora, onDeleteColor, onEditColor }) {
  const [editColor, setEditColor] = useState(colora);
  //ist usestate colora korrekt?

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
      <ColorForm />
      <button onClick={() => onDeleteColor(colora.id)}>DELETE</button>
      <button
        onClick={
          () => onEditColor(colora.hex, colora.contrastText, colora.role)
          //stimmen die übergaben?
        }
      >
        EDIT
      </button>

      <button onClick={() => setShowExtraButtons(!showExtraButtons)}>
        delete
      </button>
    </div>
  );
}
