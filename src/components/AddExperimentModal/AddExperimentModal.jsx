import AddExperimentForm from "../AddExperimentForm/AddExperimentForm";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";

export default function AddExperimentModal({ onClose }) {
  const handleAddExperimentSubmit = (values) => {
    console.log(values);
    //  dispatch(addBoard(values))
    //   .unwrap()
    //   .then(result => {
    //     dispatch(setActiveBoard(result._id));
    //     navigate(`/home/${result._id}`);
    //   });
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <AddExperimentForm onSubmitForm={handleAddExperimentSubmit} />
    </ModalWrapper>
  );
}
