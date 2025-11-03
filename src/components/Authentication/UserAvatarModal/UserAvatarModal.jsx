import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserName, selectAvatarURL } from "../../../redux/auth/selectors";
import UserImageElem from "../UserImageElem/UserImageElem";

import ModalWrapper from "../../UI/ModalWrapper/ModalWrapper";
import UserSettingsForm from "../Forms/UserSettingsForm/UserSettingsForm";
import css from "./UserAvatarModal.module.css";

export default function UserAvatarModal() {
  const userName = useSelector(selectUserName);
  const userAvatarURL = useSelector(selectAvatarURL);
  const [showUserForm, setShowUserForm] = useState(false);
  const handleAvatarClick = () => {
    setShowUserForm(true);
  };

  return (
    <div className={css.userAvatarContainer}>
      <button className={css.avatarBtn} onClick={handleAvatarClick}>
        <UserImageElem
          imgUrl={userAvatarURL}
          altText={userName}
          isSmall={true}
        />
      </button>

      {showUserForm && (
        <ModalWrapper onClose={() => setShowUserForm(false)}>
          <UserSettingsForm handleUserSave={() => setShowUserForm(false)} />
        </ModalWrapper>
      )}
    </div>
  );
}
