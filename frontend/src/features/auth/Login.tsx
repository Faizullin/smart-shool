import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import useEffectInitial from "@/core/hooks/useEffectInitial";
import useRedirectBack from "@/core/hooks/useRedirectBack";
import {
  fetchUserData,
  loginUser,
} from "@/core/redux/store/reducers/authSlice";
import InputLabel from "@/shared/components/InputLabel";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import InputError from "@/shared/components/form/InputError";
import PasswordInput from "@/shared/components/form/auth/PasswordInput";
import TextInput from "@/shared/components/form/auth/TextInput";
import TitleHelment from "@/shared/components/title/TitleHelmet";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

export default function Login() {
  const intl = useIntl();
  const dispath = useAppDispatch();
  const { redirect } = useRedirectBack();
  const { errors, loading, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispath(loginUser(data)).then((response) => {
      if (response.type === loginUser.fulfilled.toString()) {
        dispath(fetchUserData()).then((response) => {
          if (response.type === fetchUserData.fulfilled.toString()) {
            redirect();
          }
        });
      }
    });
  };
  useEffectInitial(() => {
    if (isAuthenticated && user) {
      redirect();
    }
  }, [isAuthenticated]);
  return (
    <div className="form-container">
      <TitleHelment title={intl.formatMessage({ id: "login" })} />
      <h3>
        <FormattedMessage id="login" defaultMessage="Login" />
      </h3>
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
                autoComplete="username"
                isFocused={true}
                onChange={handleInputChange}
              />
              <InputError message={errors.username} className="mt-2" />
            </div>
            <div className="form-group mb-2">
              <InputLabel
                htmlFor="input-password"
                value={intl.formatMessage({
                  id: "password",
                  defaultMessage: "Password",
                })}
              />
              <PasswordInput
                id="input-password"
                value={data.password}
                onChange={handleInputChange}
                autoComplete="current-password"
                name="password"
              />
              <InputError message={errors.password} className="mt-2" />
            </div>
            <div className="form-group mb-2">
              <PrimaryButton
                type="submit"
                processing={loading.post}
                className="bg-green-normal-active text-capitalize"
              >
                <FormattedMessage id="Zb4Zyi" defaultMessage="Click to login" />
              </PrimaryButton>
            </div>
            <InputError message={errors.detail} className="my-4" />
            <div className="form-group">
              <div className="d-flex justify-content-between flex-wrap">
                <Link
                  to="/auth/forgot_password"
                  className="text-color-green-dark"
                >
                  <FormattedMessage
                    id="cyRU1N"
                    defaultMessage="Forgot your password?"
                  />
                </Link>
                <Link to="/face_id/login" className="text-color-green-dark">
                  <FormattedMessage
                    id="E5jKnx"
                    defaultMessage="Or login via Face Id"
                  />
                </Link>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between flex-wrap">
                <FormattedMessage
                  id="QusafT"
                  defaultMessage="Not a member yet?"
                />
                <Link to="/auth/register">
                  <FormattedMessage
                    id="9B6Q74"
                    defaultMessage="Create your Account"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
