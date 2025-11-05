import React from "react";
import { useFormContext } from "react-hook-form";
import css from "./TextArea.module.css";

function TextArea({ name, onChange, value, placeholder, ...props }, ref) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={css.wrapper}>
      <textarea
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={css.input}
        {...props}
      />
      {errors[name] && (
        <span className={css.error}>{errors[name].message}</span>
      )}
    </div>
  );
}

export default React.forwardRef(TextArea);
