import { useState } from "react";

export default function ColorDelete() {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  function handleToggleDelete() {
    setShowExtraButtons((prev) => !prev);
  }

  return (
    <>
      <button onClick={handleToggleDelete}>Delete</button>
      {showExtraButtons && (
        <div>
          <button>Cancel</button>
          <button>Delete</button>
        </div>
      )}
    </>
  );
}
