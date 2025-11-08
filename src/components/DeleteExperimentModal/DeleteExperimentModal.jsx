import { useDispatch } from "react-redux";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper.jsx";
import DeleteApproveForm from "../DeleteApproveForm/DeleteApproveForm.jsx";
import { deleteSourceByNumber } from "../../redux/datasources/operations.js";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification.js";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function DeleteExperimentModal({ onClose, sourceNumber }) {
  const dispatch = useDispatch();

  const handleDeleteExperiment = () => {
    dispatch(deleteSourceByNumber(sourceNumber))
      .unwrap()
      .then(() => {
        if (isDevMode) {
          successNotify(`Deleting experiment ${sourceNumber} was successful`);
        }
        onClose?.();
      })
      .catch(() => {
        if (isDevMode) {
          errNotify(`Error deleting experiment ${sourceNumber}`);
        }
      });
  };

  return (
    <ModalWrapper onClose={onClose}>
      <DeleteApproveForm
        onApprove={handleDeleteExperiment}
        onCancel={onClose}
        title="Confirm Deletion"
        text={`Are you sure you want to delete Experiment ${sourceNumber}?`}
      />
    </ModalWrapper>
  );
}
