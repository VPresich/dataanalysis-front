import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeleteExperimentModal from "../DeleteExperimentModal/DeleteExperimentModal";
import { selectTheme } from "../../redux/auth/selectors";
import clsx from "clsx";

import css from "./CardExperiment.module.css";

export default function CardExperiment({ number, name, file_name, comment }) {
  const theme = useSelector(selectTheme);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

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
        <span className={css.number}>{number}</span>
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
        <p className={css.name}>{name}</p>
        <p className={css.fileName}>{file_name}</p>
        <p className={css.comment}>{comment}</p>
      </div>
      {isModalDelete && (
        <DeleteExperimentModal onClose={closeModalDelete} number={number} />
      )}
      {isModalEdit && (
        <DeleteExperimentModal onClose={closeModalEdit} number={number} />
      )}
    </div>
  );
}
