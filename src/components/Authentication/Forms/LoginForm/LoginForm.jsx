import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "../../../UI/Button/Button";
import IconButton from "../../../UI/IconButton/IconButton";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LoginForm.module.css";
import Input from "../../../UI/Input/Input";

export default function LoginForm({ handleLogin, onForgotPassword = null }) {
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    handleLogin(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Log In</h3>
            <p className={css.text}>
              Welcome back! Please enter your credentials to access your account
              and continue data analysis.
            </p>
          </div>
          <div className={css.inputsWrapper}>
            <Controller
              name="email"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Email" type="text" />
              )}
            />
            <Controller
              name="password"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Password" type="password" />
              )}
            />
          </div>
          {/* Forgot password link */}
          <div className={css.forgotWrapper}>
            <IconButton
              iconName="icon-log-in-out"
              theme="green"
              onClick={onForgotPassword}
            >
              Forgot password?
            </IconButton>
          </div>

          <Button type="submit" btnAuxStyles={css.btnAuxStyles}>
            Log in
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
