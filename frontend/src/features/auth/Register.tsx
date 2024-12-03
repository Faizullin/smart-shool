import React from "react";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { registerUser } from "@/core/redux/store/reducers/authSlice";
import PasswordInput from "@/shared/components/form/auth/PasswordInput";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@/shared/components/InputLabel";
import InputError from "@/shared/components/form/InputError";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import TextInput from "@/shared/components/form/auth/TextInput";
import TitleHelment from "@/shared/components/title/TitleHelmet";

export default function Register() {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const { errors, loading } = useAppSelector((state) => state.auth);

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    roles: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleRolesInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setData((state) => ({
      ...state,
      [name]: [value],
    }));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispath(registerUser(data)).then((response) => {
      if (response.type === registerUser.fulfilled.toString()) {
        navigate("/auth/login");
      }
    });
  };
  return (
    <div className="form-container">
      <TitleHelment title={intl.formatMessage({ id: "register.submit" })} />
      <h3>Register </h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-sm-8 col-xl-6">
            <div className="form-group mb-2">
              <InputLabel
                htmlFor="input-username"
                value={intl.formatMessage({
                  id: "username",
                  defaultMessage: "Username",
                })}
              />
              <TextInput
                id="input-username"
                type="text"
                name="username"
                value={data.username}
                className="form-control"
                autoComplete="off"
                onChange={handleInputChange}
              />
              <InputError message={errors.username} className="mt-2" />
            </div>
            <div className="form-group mb-2">
              <InputLabel
                htmlFor="input-email"
                value={intl.formatMessage({
                  id: "email",
                  defaultMessage: "Email",
                })}
              />
              <TextInput
                id="input-email"
                type="email"
                name="email"
                value={data.email}
                className="form-control"
                autoComplete="email"
                onChange={handleInputChange}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="form-group mb-2">
              <InputLabel
                htmlFor="input-password"
                value={intl.formatMessage({
                  id: "password",
                })}
              />
              <PasswordInput
                id="input-password"
                name="password"
                value={data.password}
                className="form-control"
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="form-group mb-2">
              <InputLabel
                htmlFor="input-password_confirmation"
                value={intl.formatMessage({
                  id: "register.password_confirmation",
                  defaultMessage: "Confirma Password",
                })}
              />
              <PasswordInput
                id="input-password_confirmation"
                name="password_confirmation"
                value={data.password_confirmation}
                className="form-control"
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>
            <div className="form-group mb-2">
              <InputLabel
                htmlFor="input-roles"
                value={intl.formatMessage({
                  id: "register.roles",
                  defaultMessage: "Roles",
                })}
              />
              <div className="form-check" onChange={handleRolesInputChange}>
                <input
                  id="input-roles-student"
                  type="radio"
                  className="form-check-input"
                  value="student"
                  name="roles"
                />
                <label
                  className="form-check-label"
                  htmlFor="input-roles-student"
                >
                  <FormattedMessage id="student" defaultMessage="Student" />
                </label>
              </div>
              <div className="form-check" onChange={handleRolesInputChange}>
                <input
                  id="input-roles-staff"
                  type="radio"
                  className="form-check-input"
                  value="staff"
                  name="roles"
                />
                <label className="form-check-label" htmlFor="input-roles-staff">
                  <FormattedMessage
                    id="register.xsc241"
                    defaultMessage="Staff (admin / teacher)"
                  />
                </label>
              </div>
              <InputError message={errors.roles} className="mt-2" />
            </div>
            <InputError message={errors.detail} className="my-4" />
            <div className="form-group mb-2">
              <PrimaryButton
                type="submit"
                processing={loading.post}
                className="bg-green-normal-active text-capitalize"
              >
                <FormattedMessage
                  id="register.submit"
                  defaultMessage="Register"
                />
              </PrimaryButton>
            </div>
            <div className="d-flex justify-content-start flex-wrap">
              <FormattedMessage
                id="register.login.not_member"
                defaultMessage="Not member yet?"
              />
              <Link to="/auth/login">
                <FormattedMessage
                  id="register.already_registered"
                  defaultMessage="Already registered"
                />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
