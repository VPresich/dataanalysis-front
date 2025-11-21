import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import Loader from "../UI/Loader/Loader";
import css from "./AppLayout.module.css";

export default function AppLayout({ children }) {
  return (
    <div className={css.container}>
      <Loader />
      <AppBar />
      <SideBar />
      <div className={css.content}>{children}</div>
    </div>
  );
}
