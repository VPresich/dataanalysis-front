import { useSelector } from "react-redux";
import { selectSourceByNumber } from "../../redux/datasources/selectors";
import EditExperimentForm from "../EditExperimentForm/EditExperimentForm";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";

export default function EditExperimentModal({ onClose, sourceNumber }) {
  const source = useSelector(selectSourceByNumber(sourceNumber));

  const handleExperimentSave = (formData) => {
    console.log("Submitted data:", formData);
    console.log("Updating experiment:", formData);
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <EditExperimentForm
        experiment={source}
        handleExperimentSave={handleExperimentSave}
      />
    </ModalWrapper>
  );
}
