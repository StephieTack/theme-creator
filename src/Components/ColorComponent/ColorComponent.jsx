import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./ColorComponent.css";

export default function ColorComponent({ colora, onDeleteColor, onEditColor }) {
  // shows two more buttons after clicking on delete button (cancel/delete)
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [clipBoardText, setClipBoardText] = useState("");
  const [clipboardConfirmation, setClipboardConfirmation] = useState("COPY");

  function handleClipboardConfirmation() {
    setClipboardConfirmation("SUCCESFULLY COPIED");

    setTimeout(() => {
      setClipboardConfirmation("COPY");
    }, 3000);
  }

  useEffect(() => {
    async function writeCopyToClipboard(text) {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
    }

    if (clipBoardText) {
      writeCopyToClipboard(clipBoardText);
    }
  }, [clipBoardText]);

  return (
    <div
      className="color-card"
      style={{
        background: colora.hex,
        color: colora.contrastText,
      }}
    >
      <h3 className="color-card-headline">{colora.hex}</h3>
      <button
        onClick={() => {
          setClipBoardText(colora.hex);
          handleClipboardConfirmation();
        }}
      >
        {clipboardConfirmation}
      </button>
      <h4>{colora.role}</h4>
      <p>contrast: {colora.contrastText}</p>

      {/* Conditionally render Delete Button based on isEditing */}
      {!isEditing && (
        <>
          {showExtraButtons ? (
            <div className="delete-confirmation">
              <p className="color-card-highlight">Really delete?</p>
              <button onClick={() => setShowExtraButtons(false)}>CANCEL</button>
              <button onClick={() => onDeleteColor(colora.id)}>DELETE</button>
            </div>
          ) : (
            <button onClick={() => setShowExtraButtons(!showExtraButtons)}>
              DELETE
            </button>
          )}
        </>
      )}

      {/* Edit Button and ColorForm */}
      {isEditing ? (
        <>
          <ColorForm
            initialData={colora}
            onAddColor={(updatedColor) => {
              onEditColor(colora.id, updatedColor);
              setIsEditing(false); // Close the form after editing
            }}
            isEditing={true}
          />
          <button onClick={() => setIsEditing(false)}>CANCEL</button>
        </>
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
          }}
        >
          EDIT
        </button>
      )}
    </div>
  );
}
