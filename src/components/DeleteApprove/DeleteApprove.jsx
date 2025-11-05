import { useForm } from "react-hook-form";
import Button from "../UI/Button/Button";
import css from "./DeleteApprove.module.css";

export const DeleteApprove = ({ onCancel, onApprove, title, text }) => {
  const { handleSubmit } = useForm();

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };
  return (
    <form onSubmit={handleSubmit(onApprove)}>
      <div className={css.content}>
        <div className={css.titleContainer}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.text}>{text}</p>
        </div>
        <div className={css.buttons}>
          <Button type="submit">Delete</Button>
          <Button onClick={handleCancel} btnAuxStyles={css.btnAuxStyles}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
