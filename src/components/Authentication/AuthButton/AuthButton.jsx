import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errNotify } from "../../../auxiliary/notification/notification";
import { ERR_LOGIN } from "../Forms/constants";
import { selectIsLoggedIn, selectTheme } from "../../../redux/auth/selectors";
import ModalWrapper from "../../UI/ModalWrapper/ModalWrapper";
import LoginForm from "../Forms/LoginForm/LoginForm";
import ForgotPasswordForm from "../Forms/ForgotPasswordForm/ForgotPasswordForm";
import { logOut, logIn } from "../../../redux/auth/operations";
import IconButton from "../../UI/IconButton/IconButton";

export default function AuthButton({ children, handleClick }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = useSelector(selectTheme);

  const handleButton = () => {
    if (isLoggedIn) {
      dispatch(logOut());
      handleClick && handleClick();
    } else {
      setShowLoginForm(true);
    }
  };

  const handleLogin = (values) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        setShowLoginForm(false);
        setShowForgotForm(false);
        handleClick && handleClick();
      })
      .catch(() => {
        errNotify(ERR_LOGIN);
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
