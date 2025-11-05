import CardsList from "../CardsList/CardsList";
import AddExperimentModal from "../AddExperimentModal/AddExperimentModal.jsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import clsx from "clsx";
import { useRef } from "react";
import css from "./SideBar.module.css";
import cardsData from "../../data/data.js";

export default function SideBar({ isOpen }) {
  const theme = useSelector(selectTheme);
  const sidebarRef = useRef(null);

  return (
    <>
      <div
        className={clsx(css.sidebar, css[theme], isOpen && css.open)}
        ref={sidebarRef}
      >
        <div className={css.content}>
          <p className={clsx(css.title, css[theme])}>My experiments</p>
          <AddExperimentModal />
          <CardsList cards={cardsData} />
        </div>
      </div>
    </>
  );
}
