// import BoardList from "../BoardList/BoardList";
// import CreateBoard from "../CreateBoard/CreateBoard";
// import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import clsx from "clsx";
import { useRef, useEffect, useCallback } from "react";
import css from "./SideBar.module.css";

export default function SideBar({ isOpen, onClose }) {
  const theme = useSelector(selectTheme);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  const handleClickOutside = useCallback(
    (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose] // dependency
  );

  // Attach event listener only when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]); // added handleClickOutside to dependencies

  return (
    <>
      {/* overlay */}
      <div className={clsx(css.sidebarBackdrop, isOpen && css.open)} />

      {/* sidebar */}
      <div
        className={clsx(css.sidebar, css[theme], isOpen && css.open)}
        ref={sidebarRef}
      >
        {/* <Logo /> */}
        <p className={clsx(css.sidebarTitle, css[theme])}>My boards</p>
        {/* <CreateBoard />
        <BoardList /> */}
      </div>
    </>
  );
}
