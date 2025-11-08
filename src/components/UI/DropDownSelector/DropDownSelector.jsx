import { useState } from "react";
import iconsPath from "../../../assets/img/icons.svg";
import clsx from "clsx";
import css from "./DropDownSelector.module.css";

const DropDownSelector = ({
  btnLabel,
  options,
  selectedOption,
  onChange,
  optionCSSClass,
  dropdownCSSClass,
  btnCSSClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnChange = (event) => {
    onChange(event.target.value);
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.container}>
      <button
        className={clsx(
          css.btn,
          { [css.open]: isOpen },
          btnCSSClass && btnCSSClass
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={clsx(css.text, btnCSSClass)}>{btnLabel}</span>
        <div className={clsx(css.iconContainer)}>
          <svg className={clsx(css.icon)} aria-label="arrow icon">
            <use href={`${iconsPath}#icon-dropdown`} />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div
          className={clsx(
            css.dropdownWrapper,
            dropdownCSSClass && dropdownCSSClass
          )}
        >
          <div className={clsx(css.dropdown)}>
            {options.map((option, index) => (
              <label
                key={index}
                className={clsx(
                  css.option,
                  {
                    [css.selected]: selectedOption === option,
                    [css.inactive]: selectedOption !== option,
                  },
                  optionCSSClass && optionCSSClass
                )}
              >
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOnChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownSelector;

// import { useState, useRef, useEffect } from "react";
// import iconsPath from "../../../assets/img/icons.svg";
// import clsx from "clsx";
// import css from "./DropDownSelector.module.css";

// const DropDownSelector = ({
//   btnLabel,
//   options = [],
//   selectedOption,
//   onChange,
//   optionCSSClass,
//   dropdownCSSClass,
//   btnCSSClass,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Закрытие по клику вне компонента
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleOptionChange = (value) => {
//     if (value !== selectedOption) {
//       onChange(value);
//     }
//     setIsOpen(false);
//   };

//   return (
//     <div className={css.container} ref={dropdownRef}>
//       <button
//         type="button"
//         className={clsx(css.btn, { [css.open]: isOpen }, btnCSSClass)}
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         <span className={clsx(css.text, btnCSSClass)}>{btnLabel}</span>
//         <div className={css.iconContainer}>
//           <svg className={css.icon} aria-label="arrow icon">
//             <use href={`${iconsPath}#icon-dropdown`} />
//           </svg>
//         </div>
//       </button>

//       {isOpen && (
//         <div className={clsx(css.dropdownWrapper, dropdownCSSClass)}>
//           <div className={css.dropdown}>
//             {options.map((option, index) => (
//               <label
//                 key={index}
//                 className={clsx(
//                   css.option,
//                   {
//                     [css.selected]: selectedOption === option,
//                     [css.inactive]: selectedOption !== option,
//                   },
//                   optionCSSClass
//                 )}
//               >
//                 <input
//                   type="radio"
//                   value={option}
//                   checked={selectedOption === option}
//                   onChange={() => handleOptionChange(option)}
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropDownSelector;
