import { useForm, FormProvider, Controller } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
// import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import UserImageElem from "../../UserImageElem/UserImageElem";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import UploadFileButton from "../../UploadFileButton/UploadFileButton";
import { feedbackSchema } from "./feedbackSchema";
import { selectUser } from "../../../../redux/auth/selectors";
import iconsPath from "../../../../assets/img/sprite.svg";
import css from "./UserSettingsForm.module.css";

const UserSettingsForm = ({ handleUserSave }) => {
  const { name, email, avatarURL } = useSelector(selectUser);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatar, setAvatar] = useState(avatarURL);

  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      name: name || email || "",
      email: email || "",
    },
    shouldUnregister: true,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    if (avatarFile) {
      values.avatar = avatarFile;
    }
    handleUserSave && handleUserSave(values);
  };

  const handleEditAvatar = (newAvatarUrl, avatarFile) => {
    setAvatarFile(avatarFile);
    setAvatar(newAvatarUrl);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>User info</h3>
            <div className={css.imgWrapper}>
              <UserImageElem imgUrl={avatar} altText={`Photo of ${name}`} />
              <UploadFileButton
                icon={
                  <svg
                    className={css.btnIconContainer}
                    aria-label="Upload icon"
                  >
                    <use
                      className={css.btnIcon}
                      href={`${iconsPath}#icon-upload`}
                    />
                  </svg>
                }
                className={css.uploadBtn}
                onFileSelect={handleEditAvatar}
              >
                Upload photo
              </UploadFileButton>
            </div>
          </div>
          <div className={css.inputsWrapper}>
            <Controller
              name="name"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Name" type="text" />
              )}
            />
            <Controller
              name="email"
              control={methods.control}
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
