import { useState } from "react";
import Button from "../UI/Button/Button";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import AddExperimentForm from "../AddExperimentForm/AddExperimentForm";
import css from "./AddExperimentModal.module.css";

export default function AddExperimentModal() {
  const [showAddExperimentForm, setShowAddExperimentForm] = useState(false);

  const handleAddClick = () => {
    setShowAddExperimentForm(true);
  };
  const handleDataUpload = (values) => {
    //Upload data
    console.log(values);
    setShowAddExperimentForm(false);
  };

  return (
    <div className={css.userAvatarContainer}>
      <Button onClick={handleAddClick}> + Add Data</Button>
      {showAddExperimentForm && (
        <ModalWrapper onClose={handleDataUpload}>
          <AddExperimentForm handleDataUpload={handleDataUpload} />
        </ModalWrapper>
      )}
    </div>
  );
}
