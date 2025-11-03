import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import spritePath from "../../../img/sprite.svg";
import { deleteExperiment } from "../../../redux/tasks/operations";
import { selectTheme } from "../../../redux/auth/selectors";
import clsx from "clsx";
import EditCardModal from "../../EditCardModal/EditCardModal";
import LinesEllipsis from "react-lines-ellipsis";
import EllipsisText from "react-ellipsis-text";
import styles from "./Card.module.css";

export default function CardExperiment({ number, name, file_name, comment }) {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    openModal();
  };

  const handleDelete = () => {
    dispatch(deleteExperiment(number));
  };

  return (
    <div className={clsx(styles.card, styles[theme])}>
      <EllipsisText
        text={name}
        length={50}
        className={clsx(styles.cardTitle, styles[theme])}
      />

      <LinesEllipsis
        text={comment}
        maxLine="2"
        ellipsis="..."
        trimRight
        basedOn="letters"
        component="p"
        className={clsx(
          styles.containerCard,
          styles.cardDescription,
          styles[theme]
        )}
      />

      <div className={clsx(styles.cardLine, styles[theme])}></div>
      <div className={styles.cardBottom}>
        <div className={styles.cardInfo}></div>
        <svg
          className={clsx(styles.color, styles[theme])}
          width="16"
          height="16"
          aria-label="btn icon"
          onClick={handleEdit}
        >
          <use href={`${spritePath}#icon-pencil`} />
        </svg>

        <svg
          className={clsx(styles.color, styles[theme])}
          width="16"
          height="16"
          aria-label="btn icon"
          onClick={handleDelete}
        >
          <use href={`${spritePath}#icon-trash`} />
        </svg>
      </div>
      {isModalOpen && (
        <EditCardModal
          onClose={closeModal}
          card={{ number, name, file_name, comment }}
        />
      )}
    </div>
  );
}
