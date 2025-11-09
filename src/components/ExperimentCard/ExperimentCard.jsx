import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeleteExperimentModal from "../DeleteExperimentModal/DeleteExperimentModal";
import EditExperimentModal from "../EditExperimentModal/EditExperimentModal";
import UnauthorizedModal from "../UnauthorizedModal/UnauthorizedModal";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import clsx from "clsx";

import css from "./ExperimentCard.module.css";

export default function ExperimentCard({ experiment }) {
  const { source_number, source_name, file_name, comment } = experiment;

  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = useSelector(selectTheme);

  const handleEdit = () => {
    setIsModalEdit(true);
    setIsModalDelete(false);
  };

  const handleDelete = () => {
    setIsModalEdit(false);
    setIsModalDelete(true);
  };

  const closeModalEdit = () => {
    setIsModalEdit(false);
  };

  const closeModalDelete = () => {
    setIsModalDelete(false);
  };

  return (
    <div className={clsx(css.card, css[theme])}>
      <div className={css.title}>
        <span className={css.number}>{source_number}</span>
        <p className={css.name}>{source_name}</p>
        <div className={css.buttons}>
          <span className={css.btn} onClick={handleEdit}>
            <FaEdit className={clsx(css.icon, css[theme])} size={20} />
          </span>
          <span className={css.btn} onClick={handleDelete}>
            <FaTrash className={clsx(css.icon, css[theme])} size={20} />
          </span>
        </div>
      </div>

      {/* Info section */}
      <div className={css.info}>
        <p className={css.fileName}>{file_name}</p>
        <p className={css.comment}>{comment}</p>
      </div>
      {isModalDelete &&
        (isLoggedIn ? (
          <DeleteExperimentModal onClose={closeModalDelete} />
        ) : (
          <UnauthorizedModal onClose={closeModalDelete} />
        ))}
      {isModalEdit &&
        (isLoggedIn ? (
          <EditExperimentModal
            sourceNumber={source_number}
            onClose={closeModalEdit}
          />
        ) : (
          <UnauthorizedModal onClose={closeModalEdit} />
        ))}
    </div>
  );
}
