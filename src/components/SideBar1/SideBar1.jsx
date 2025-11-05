// import AddExperiment from "../AddExperiment/";
import CardsList from "../CardsList/CardsList.jsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors.js";
import clsx from "clsx";
import { useRef, useEffect, useCallback } from "react";
import css from "./SideBar1.module.css";
import cardsData from "../../data/data.js";

export default function SideBar1({ isOpen, onClose }) {
  const theme = useSelector(selectTheme);
  const sidebarRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <>
      <div className={clsx(css.backdrop, isOpen && css.open)}>
        <div
          className={clsx(css.sidebar, css[theme], isOpen && css.open)}
          ref={sidebarRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={css.content}>
            <p className={clsx(css.title, css[theme])}>My experiments</p>
            <CardsList cards={cardsData} />
          </div>
        </div>
      </div>
    </>
  );
}
