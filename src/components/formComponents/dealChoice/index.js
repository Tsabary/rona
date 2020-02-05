import "./styles.scss";
import React from "react";

const DealChoice = ({ id, onClick, text, isChecked = false }) => {
  return (
    <div className="deal-choice">
      <input
        className="deal-choice__radio"
        id={id}
        type="radio"
        name="dealChoices"
        onChange={onClick}
        defaultChecked={isChecked}
      />
      <label htmlFor={id} className="deal-choice__label">
        <div className="deal-choice__button" id="component">
          {text}
        </div>
      </label>
    </div>
  );
};

export default DealChoice;

// const DealChoice = ({ id, onClick, text, isChecked = false }) => {
//   const [checked, setChecked] = useState(isChecked);
//   useEffect(() => {
//     console.log(id);
//     if (checked) onClick();
//   }, [checked]);

//   return (
//     <div className="deal-choice">
//       <input
//         className="deal-choice__radio"
//         id={id}
//         type="radio"
//         name="dealChoices"
//         onChange={()=>setChecked(!checked)}
//         defaultChecked={checked}
//       />
//       <label htmlFor={id} className="deal-choice__label">
//         <div className="deal-choice__button" id="component">
//           {text}
//         </div>
//       </label>
//     </div>
//   );
// };

// export default DealChoice;
