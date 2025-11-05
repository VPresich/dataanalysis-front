import { useSelector, useDispatch } from "react-redux";
import { selectSidebarOpen } from "../../redux/sidebar/selectors";
import { closeSidebar } from "../../redux/sidebar/slice";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import css from "./AppLayout.module.css";

export default function AppLayout({ children }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSidebarOpen);

  return (
    <div className={css.container}>
      <AppBar />
      <SideBar isOpen={isOpen} onClose={() => dispatch(closeSidebar())} />
      <div className={css.content}>{children}</div>
    </div>
  );
}
