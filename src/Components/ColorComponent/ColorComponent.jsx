import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./ColorComponent.css";

export default function ColorComponent({
  colora,
  onDeleteColor,
  onEditColor,
  onFetch,
}) {
  console.log("colora:", colora);
  // show two more buttons after clicking on delete button (cancel/delete)
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  // state to decide if in editing mode or not
  // - if yes: show color form for editing and cancel button
  // - if no: show delete button and edit button
  const [isEditing, setIsEditing] = useState(false);

  // from line 15 to 35 the copy to clipboardfunction is declared
  const [clipBoardText, setClipBoardText] = useState("");
  const [clipboardConfirmation, setClipboardConfirmation] = useState("COPY");

  // copy text function
  useEffect(() => {
    async function writeCopyToClipboard(text) {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
    }
    if (clipBoardText) {
      writeCopyToClipboard(clipBoardText);
    }
  }, [clipBoardText]);

  // function to set copy button to successfully copied and back to copy after 3s
  function handleClipboardConfirmation() {
    setClipboardConfirmation("SUCCESFULLY COPIED");

    setTimeout(() => {
      setClipboardConfirmation("COPY");
    }, 3000);
  }

  // state to store the overall contrast score for the contast check
  const [overallContrastScore, setOverallContrastScore] = useState(null);

  // function for contrast check
  useEffect(() => {
    async function fetchContrastScore() {
      try {
        const responseData = await onFetch({
          contrastText: colora.contrastText,
          hex: colora.hex,
        });
        setOverallContrastScore(responseData.overall); // Setzt den Overall-Wert
        console.log("log responseData in colorcomponent:", responseData);
      } catch (error) {
        console.error("Error fetching contrast score:", error);
      }
    }

    fetchContrastScore();
  }, [colora.contrastText, colora.hex]); // dependencies for useEffect

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
      <p>Overall Contrast Score: {overallContrastScore}</p>

      {/* conditionally render Delete and Cancel Button based on isEditing */}
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

      {/* condition when in edit mode */}
      {isEditing ? (
        <>
          {console.log("Rendering ColorForm für:", colora)}
          <ColorForm
            initialData={colora}
            onAddColor={(updatedColor) => {
              onEditColor(colora.id, updatedColor);
              setIsEditing(false); // close the form after editing
            }}
            isEditing={true}
          />
          <button onClick={() => setIsEditing(false)}>CANCEL</button>
        </>
      ) : (
        <button
          onClick={() => {
            console.log("Bearbeitungsmodus aktivieren für Farbe:", colora);
            setIsEditing(true);
          }}
        >
          EDIT
        </button>
      )}
    </div>
  );
}
