import { useSelector } from "react-redux";
import ExperimentCardsList from "../ExperimentCardsList/ExperimentCardsList.jsx";
import AddExperiment from "../AddExperiment/AddExperiment.jsx";
import { selectTheme } from "../../redux/auth/selectors";
import { selectSources } from "../../redux/datasources/selectors.js";
import clsx from "clsx";
import { useRef } from "react";
import css from "./SideBar.module.css";

export default function SideBar({ isOpen }) {
  const sources = useSelector(selectSources);
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
          <AddExperiment />
          <ExperimentCardsList experiments={sources} />
        </div>
      </div>
    </>
  );
}
