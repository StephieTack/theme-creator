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
  const [buttonText, setButtonText] = useState("Delete");

  function handleToggleDelete() {
    setShowExtraButtons((prev) => !prev);
    setButtonText((prev) => (prev === "Delete" ? "Are you sure?" : "Delete"));
  }

  function handleCancel() {
    setShowExtraButtons(false);
    setButtonText("Delete");
  }

  function handleFinalDelete() {
    if (colorId !== null) {
      onDelete(colorId);
      setShowExtraButtons(false);
      setButtonText("Delete");
    }
  }

  return (
    <>
      <button onClick={handleToggleDelete} className="color-card-highlight">
        {buttonText}
      </button>
      {showExtraButtons && (
        <div>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleFinalDelete}>Confirm Delete</button>
        </div>
      )}
    </>
  );
}
