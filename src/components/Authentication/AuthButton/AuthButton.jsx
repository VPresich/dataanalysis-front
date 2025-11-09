import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../../redux/sidebar/slice";
import { ERR_LOGIN } from "../Forms/constants";
import { selectIsLoggedIn, selectTheme } from "../../../redux/auth/selectors";
import ModalWrapper from "../../UI/ModalWrapper/ModalWrapper";
import LoginForm from "../Forms/LoginForm/LoginForm";
import ForgotPasswordForm from "../Forms/ForgotPasswordForm/ForgotPasswordForm";
import { logOut, logIn } from "../../../redux/auth/operations";
import {
  errNotify,
  successNotify,
} from "../../../auxiliary/notification/notification";

import IconButton from "../../UI/IconButton/IconButton";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function AuthButton({ children, handleClick }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = useSelector(selectTheme);

  const handleButton = () => {
    if (isLoggedIn) {
      dispatch(logOut())
        .unwrap()
        .then(() => {
          if (isDevMode) {
            successNotify("You have been logged out successfully.");
          }
          dispatch(closeSidebar());
          handleClick && handleClick();
        })
        .catch(() => {
          errNotify("Failed to log out. Please try again.");
        });
    } else {
      setShowLoginForm(true);
    }
  };

  const handleLogin = (values) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify("You have logged in successfully");
        }
        setShowLoginForm(false);
        setShowForgotForm(false);
        handleClick && handleClick();
      })
      .catch((err) => {
        if (err.status === 403) {
          errNotify(
            "Please verify your email. Check your inbox for the confirmation link."
          );
        } else {
          errNotify(ERR_LOGIN);
        }
      });
  };

  const handleCloseLogin = () => {
    setShowLoginForm(false);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotForm(false);
    setShowLoginForm(true);
  };

  const handleForgotPasswordOpen = () => {
    setShowLoginForm(false);
    setShowForgotForm(true);
  };

  return (
    <div>
      <IconButton
        iconName="icon-log-in-out"
        theme={theme}
        onClick={handleButton}
      >
        {children}
      </IconButton>
      {showLoginForm && (
        <ModalWrapper onClose={handleCloseLogin}>
          <LoginForm
            handleLogin={handleLogin}
            onForgotPassword={handleForgotPasswordOpen}
          />
        </ModalWrapper>
      )}
      {showForgotForm && (
        <ModalWrapper onClose={handleForgotPasswordClose}>
          <ForgotPasswordForm onBack={handleForgotPasswordClose} />
        </ModalWrapper>
      )}
    </div>
  );
}
