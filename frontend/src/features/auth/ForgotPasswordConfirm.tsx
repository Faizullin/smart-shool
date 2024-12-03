import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import InputLabel from "@/shared/components/InputLabel";
import InputError from "@/shared/components/form/InputError";
import { useNavigate, useSearchParams } from "react-router-dom";
import { forgotUserPasswordConfirm } from "@/core/redux/store/reducers/authSlice";
import PasswordInput from "@/shared/components/form/auth/PasswordInput";
import PrimaryButton from "@/shared/components/buttons/primary-button/PrimaryButton";
import TitleHelment from "@/shared/components/title/TitleHelmet";

const ForgotPasswordConfirm = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const { errors, loading } = useAppSelector((state) => state.auth);
  const [data, setData] = React.useState({
    password: "",
    token: "",
  });
  const [searchParams, _] = useSearchParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispath(forgotUserPasswordConfirm(data)).then((response) => {
      if (response.type === forgotUserPasswordConfirm.fulfilled.toString()) {
        navigate("/auth/login");
      }
    });
  };

  React.useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setData((data) => ({
        ...data,
        token,
      }));
    }
  }, [searchParams]);
  return (
    <div className="form-container">
      <TitleHelment title={"Password confirm"} />
      <h3>
        <FormattedMessage id="73QGlP" defaultMessage="Confirm new password ?" />
      </h3>
      <form className="form-group" onSubmit={handleSubmit}>
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
          />
          <InputError message={errors.password} className="mt-2" />
        </div>
        <div className="form-group mb-2">
          <PrimaryButton
            type="submit"
            processing={loading.post}
            className="bg-green-normal-active text-capitalize"
          >
            <FormattedMessage id="confirm" />
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordConfirm;
