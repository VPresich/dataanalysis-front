import ModalWrapper from "../UI/ModalWrapper/ModalWrapper.jsx";
import { useDispatch } from "react-redux";
// import { deleteExperiment } from "../../redux/data/operations.js";
import {
  errNotify,
  successNotify,
} from "../../auxiliary/notification/notification.js";

import { DeleteApprove } from "../DeleteApprove/DeleteApprove";

export default function DeleteExperimentModal({ onClose, numberSource }) {
  const dispatch = useDispatch();
  const onApprove = () => {
    // dispatch(deleteExperiment(numberSource))
    //   .unwrap()
    //   .then(() => {
    //     if (import.meta.env.VITE_DEVELOPED_MODE === "true") {
    //       successNotify("Delete success");
    //     }
    //   })
    //   .catch(() => {
    //     errNotify("Error in delete data");
    //   });
    onClose();
  };
  return (
    <ModalWrapper onClose={onClose}>
      <DeleteApprove onCancel={onClose} onApprove={onApprove} />
    </ModalWrapper>
  );
}
