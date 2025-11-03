import { useState } from "react";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import css from "./AppLayout.module.css";

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className={css.container}>
      <AppBar handleSidebar={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={css.content}>{children}</div>
    </div>
  );
}
