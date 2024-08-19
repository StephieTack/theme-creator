// import "./Color.css";
// import ColorDelete from "../ColorDelete/ColorDelete";

// export default function ColorComponent({ color }) {
//   return (
//     <div
//       className="color-card"
//       style={{
//         background: color.hex,
//         color: color.contrastText,
//       }}
//     >
//       <h3 className="color-card-headline">{color.hex}</h3>
//       <h4>{color.role}</h4>
//       <p>contrast: {color.contrastText}</p>
//       <ColorDelete />
//     </div>
//   );
// }

import "./Color.css";
import ColorDelete from "../ColorDelete/ColorDelete";

export default function ColorComponent({ color, onDelete }) {
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <ColorDelete colorId={color.id} onDelete={onDelete} />
    </div>
  );
}
