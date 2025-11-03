import css from "./AppLayout.module.css";

export default function AppLayout({ children }) {
  return <div className={css.container}>{children}</div>;
}

// import AppBar from '../../components/AppBar/AppBar';
// import SideBar from '../../components/SideBar/SideBar';
// import css from './Layout.module.css';
// import { useState } from 'react';

// export default function Layout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const openSidebar = () => { setIsSidebarOpen(true); }
//   return (
//     <div className={css.page}>
//       <SideBar isOpen={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)} />
//       <div className={css.normalWidth}>
//         <AppBar handleSidebar={() => openSidebar()} />
//         {children}
//       </div>
//     </div>
//   );
// }
