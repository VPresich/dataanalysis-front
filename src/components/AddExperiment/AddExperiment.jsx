import { useState } from "react";
import { useSelector } from "react-redux";
import Separator from "../UI/Separator/Separator";
import Button from "../UI/Button/Button";
import AddExperimentModal from "../AddExperimentModal/AddExperimentModal";
import UnauthorizedModal from "../UnauthorizedModal/UnauthorizedModal";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AddExperiment.module.css";

export default function AddExperiment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <Separator />
      <Button onClick={openModal}> + Upload Data to DB</Button>
      <Separator />
      {isModalOpen &&
        (isLoggedIn ? (
          <AddExperimentModal onClose={closeModal} />
        ) : (
          <UnauthorizedModal onClose={closeModal} />
        ))}
    </div>
  );
}
