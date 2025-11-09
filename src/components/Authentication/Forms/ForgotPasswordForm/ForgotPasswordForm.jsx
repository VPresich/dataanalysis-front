import { useForm, FormProvider, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../redux/auth/selectors";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import IconButton from "../../../UI/IconButton/IconButton";
import css from "./ForgotPasswordForm.module.css";

export default function ForgotPasswordForm({ onBack }) {
  const theme = useSelector(selectTheme);
  const methods = useForm({
    defaultValues: { email: "" },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    console.log("Send reset link to:", values.email);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <h3 className={css.title}>Reset Password</h3>
          <p className={css.text}>
            Enter your email address and we will send you instructions to reset
            your password.
          </p>

          <Controller
            name="email"
            control={methods.control}
            render={({ field }) => (
              <Input {...field} placeholder="Email" type="text" />
            )}
          />
          <div className={css.btnGroup}>
            <div className={css.backWrapper}>
              <IconButton
                iconName="icon-log-in-out"
                theme={theme}
                onClick={onBack}
              >
                Back
              </IconButton>
            </div>
            <Button type="submit">Send Link</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
