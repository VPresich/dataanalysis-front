import { useSelector } from "react-redux";
import clsx from "clsx";
import {
  selectIsLoggedIn,
  selectUserName,
  selectTheme,
} from "../../../redux/auth/selectors";
import AuthButton from "../AuthButton/AuthButton";
import RegistrationButton from "../RegistrationButton/RegistrationButton";
import UserAvatarModal from "../UserAvatarModal/UserAvatarModal";
import GoogleButton from "../GoogleBtn/GoogleBtn";

import css from "./AuthMenu.module.css";

const AuthMenu = ({ handleSidebar }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const theme = useSelector(selectTheme);

  return (
    <div className={css.authPart}>
      {isLoggedIn ? (
        <>
          <UserAvatarModal />
          <p className={css.userName}>{`Hi, ${userName}`}</p>
          <button
            className={clsx(css.sidebarBtn, css[theme])}
            onClick={handleSidebar}
          >
            ☰ Data
          </button>
          <AuthButton>Logout</AuthButton>
        </>
      ) : (
        <>
          <AuthButton>Log In</AuthButton>
          <div className={css.btnsWrapper}>
            <RegistrationButton />
            <GoogleButton />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthMenu;
