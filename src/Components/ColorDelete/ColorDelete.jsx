// import { useState } from "react";

// export default function ColorDelete({ onDelete, colorId }) {
//   const [showExtraButtons, setShowExtraButtons] = useState(false);

//   function handleToggleDelete() {
//     setShowExtraButtons((prev) => !prev);
//   }

//   function handleCancel() {
//     setShowExtraButtons(false);
//   }

//   function handleFinalDelete() {
//     onDelete(colorId);
//   }

//   return (
//     <>
//       <button onClick={handleToggleDelete}>Delete</button>
//       {showExtraButtons && (
//         <div>
//           <button onClick={handleCancel}>Cancel</button>
//           <button onClick={handleFinalDelete}>Delete</button>
//         </div>
//       )}
//     </>
//   );
// }

import { useState } from "react";

export default function ColorDelete({ colorId, onDelete }) {
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const [buttonText, setButtonText] = useState("DELETE");

  function handleToggleDelete() {
    setShowExtraButtons((currentText) => !currentText);
    setButtonText((currentText) =>
      currentText === "DELETE" ? "Really delete?" : "DELETE"
    );
  }

  function handleCancel() {
    setShowExtraButtons(false);
    setButtonText("DELETE");
  }

  function handleFinalDelete() {
    if (colorId !== null) {
      onDelete(colorId);
      setShowExtraButtons(false);
      setButtonText("DELETE");
    }
  }

  return (
    <>
      <button
        onClick={handleToggleDelete}
        className={`button-default ${
          showExtraButtons ? "color-card-highlight" : ""
        }`}
      >
        {buttonText}
      </button>
      {showExtraButtons && (
        <div>
          <button onClick={handleCancel}>CANCEL</button>
          <button onClick={handleFinalDelete}>DELETE</button>
        </div>
      )}
    </>
  );
}
