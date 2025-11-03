// import BoardList from "../BoardList/BoardList";
// import CreateBoard from "../CreateBoard/CreateBoard";
// import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import clsx from "clsx";
import { useRef } from "react";
import css from "./SideBar.module.css";

export default function SideBar({ isOpen, onClose }) {
  const theme = useSelector(selectTheme);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      onClose();
    }
  };
  return (
    <div
      className={
        isOpen ? clsx(css.sidebarBackdrop, css.open) : css.sidebarBackdrop
      }
      onClick={handleClickOutside}
    >
      <div className={clsx(css.sidebar, css[theme])} ref={sidebarRef}>
        {/* <Logo /> */}
        <p className={clsx(css.sidebarTitle, css[theme])}>My boards</p>
        {/* <CreateBoard />
        <BoardList />    */}
      </div>
    </div>
  );
}
