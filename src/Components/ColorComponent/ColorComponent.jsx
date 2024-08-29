import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./ColorComponent.css";

export default function ColorComponent({ colora, onDeleteColor, onEditColor }) {
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
      const dataObject = {
        colors: [colora.hex, colora.contrastText],
      };
      console.log("dataObject:", dataObject);

      try {
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

        if (!response.ok) {
          throw new Error("Error fetching contrast score");
        }

        const responseData = await response.json();
        setOverallContrastScore(responseData.overall); // Setzt den Overall-Wert
      } catch (error) {
        console.error("Error fetching contrast score:", error);
      }
    }

    fetchContrastScore();
  }, [colora.contrastText, colora.hex]); // dependencies for useEffect

  //checks the score and renders the correct color per score
  const handleScoreColor = () => {
    if (overallContrastScore === "Yup") {
      return "lightgreen";
    } else if (overallContrastScore === "Kinda") {
      return "orange";
    } else if (overallContrastScore === "Nope") {
      return "red";
    } else {
      return "null";
    }
  };

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
      <div>
        <p
          className="color-card-score"
          style={{ backgroundColor: handleScoreColor() }}
        >
          Overall Contrast Score: {overallContrastScore}
        </p>
      </div>

      {/* conditionally render Delete and Cancel Button based on isEditing */}
      {!isEditing && (
        <>
          {showExtraButtons ? (
            <div className="delete-confirmation">
              <p className="color-card-highlight">Really delete?</p>
              <div className="button-grou">
                <button onClick={() => setShowExtraButtons(false)}>
                  CANCEL
                </button>
                <button onClick={() => onDeleteColor(colora.id)}>DELETE</button>
              </div>
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
        <div className="button-grou">
          <ColorForm
            initialData={colora}
            onAddColor={(updatedColor) => {
              onEditColor(colora.id, updatedColor);
              setIsEditing(false); // close the form after editing
            }}
            isEditing={true}
          />
          <button onClick={() => setIsEditing(false)}>CANCEL</button>
        </div>
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
