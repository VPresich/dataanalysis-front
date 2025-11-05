import { useForm, FormProvider, Controller } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import UserImageElem from "../../UserImageElem/UserImageElem";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import UploadFileButton from "../../../UploadFileButton/UploadFileButton";
import { feedbackSchema } from "./feedbackSchema";
import { selectUser } from "../../../../redux/auth/selectors";
import iconsPath from "../../../../assets/img/sprite.svg";
import css from "./UserSettingsForm.module.css";

const UserSettingsForm = ({ handleUserSave }) => {
  const { name, email, theme, avatarURL } = useSelector(selectUser);
  const [userAvatarURL, setUserAvatarURL] = useState(avatarURL);

  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      name: name || email || "",
      email: email || "",
      avatar: null,
    },
    shouldUnregister: true,
  });

  const { handleSubmit, setValue, control } = methods;

  const onSubmit = async (values) => {
    handleUserSave && handleUserSave(values);
  };

  const handleEditAvatar = (file) => {
    console.log("RESULT", file);
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setValue("avatar", file, { shouldValidate: true });
    setUserAvatarURL(previewUrl);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>User info</h3>
            <div className={css.imgWrapper}>
              <UserImageElem
                imgUrl={userAvatarURL}
                altText={`Photo of ${name}`}
              />
              <Controller
                name="avatar"
                control={control}
                render={({ field, fieldState }) => (
                  <UploadFileButton
                    icon={
                      <svg
                        className={css.btnIconContainer}
                        aria-label="Upload icon"
                      >
                        <use
                          className={clsx(css.btnIcon, css[theme])}
                          href={`${iconsPath}#icon-upload`}
                        />
                      </svg>
                    }
                    className={clsx(css.uploadBtn, css[theme])}
                    accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                    onFileSelect={(file) => {
                      field.onChange(file);
                      handleEditAvatar(file);
                    }}
                    error={fieldState?.error?.message}
                  >
                    Upload photo
                  </UploadFileButton>
                )}
              />
            </div>
          </div>
          <div className={css.inputsWrapper}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Name" type="text" />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Email" type="text" />
              )}
            />
          </div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserSettingsForm;
