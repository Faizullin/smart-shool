import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { loginUser } from "@/core/redux/store/reducers/authSlice";
import { openModal } from "@/core/redux/store/reducers/modalSlice";
import StudentService from "@/core/services/StudentService";
import FaceIdDetector from "@/shared/components/face_id/FaceIdDetector";
import TitleHelment from "@/shared/components/title/TitleHelmet";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmit, user_data }) => {
  const { errors } = useAppSelector((state) => state.auth);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (event) =>
    setData((data) => ({ ...data, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      username: data.email,
      password: data.password,
    });
  };
  useEffect(() => {
    if (user_data && user_data.username) {
      setData((data) => ({
        ...data,
        username: user_data.username,
        email: user_data.email,
      }));
    }
  }, [user_data]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-4">
        <div className="col-6">
          <label htmlFor="input-username">
            <FormattedMessage id="username" />
          </label>
          <input
            id="input-username"
            type="text"
            className="form-control"
            name="username"
            value={data.username}
            onChange={handleChange}
            autoComplete="username"
            readOnly
          />
        </div>
        <div className="col-6">
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            className="form-control"
            name="email"
            value={data.email}
            onChange={handleChange}
            autoComplete="current-password"
            readOnly
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="input-password">
          <FormattedMessage id="password" />
        </label>
        <input
          id="input-password"
          type="password"
          className="form-control"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div className="invalid-feedback mt-2">{errors.password}</div>
        )}
      </div>
      {errors.detail && (
        <div className="invalid-feedback d-block mb-3">{errors.detail}</div>
      )}
      <button type="submit" className="btn btn-primary">
        <FormattedMessage id="login" />
      </button>
    </form>
  );
};

export default function FaceIdLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
  });

  const handleClose = () => setShowForm(false);

  const onLoginFormSubmit = (data: any) => {
    dispatch(loginUser(data)).then((response) => {
      if (response.type === loginUser.fulfilled.toString()) {
        handleClose();
        const new_location = "/dashboard/profile";
        navigate(new_location);
      }
    });
  };

  const handleSubmit = (data: FormData) => {
    StudentService.loginViaFace(data)
      .then((response) => {
        setUserData({
          email: response.data.email,
          username: response.data.username,
        });
        setShowForm(true);
      })
      .catch((error) => {
        if (error.response.status && error.response.data) {
          if (
            error.response.data.success === false &&
            error.response.data.message
          ) {
            dispatch(
              openModal({
                type: "error",
                data: {
                  code: error.response.status,
                  message: error.response.data.message,
                },
              })
            );
          }
        }
      });
  };
  const handleFullDetect = (file: any) => {
    const formData = new FormData();
    formData.append("image", file);
    handleSubmit(formData);
  };
  return (
    <div className="form-container">
      <TitleHelment title={"Face-id Login"} />
      <h3>
        <FormattedMessage
          id="face_id.login_with_face_id"
          defaultMessage="Login with face id"
        />
      </h3>
      <FaceIdDetector
        detectLimit={2}
        onFullDetect={handleFullDetect}
        delay_interval={300}
      />
      <div className="mt-3">
        <div className="d-flex justify-content-between flex-wrap">
          <FormattedMessage
            id="face_id.dvda"
            defaultMessage="No face id provided?"
          />
          <Link to="/face_id/train">
            <FormattedMessage
              id="face_id.lets_train"
              defaultMessage="Let's train"
            />
          </Link>
        </div>
      </div>
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={onLoginFormSubmit} user_data={userData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <FormattedMessage id="close" defaultMessage="Close" />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
