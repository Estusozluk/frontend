import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import useForm from "../FormValidation/useForm";
import ErrorModal from "../Modals/Error/ErrorModal";

const Login = (props) => {
  const {
    handleChange,
    handleLoginSubmit,
    validateInfo,
    handleLoginChange,
    loginValues,
    error,
    setError,
  } = useForm();

  const confirm = () => {
    setError(null);
  };

  return (
    <div className="registerLogin">
      <form className="registerLoginForm">
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            confirm={confirm}
          />
        )}
        <h2 className="registrationLoginTitle">
          oo kimler gelmiş, tekrardan hoş geldin
        </h2>

        <Link to="/register">
          <p className="passToRegister">
            ya da ilk defa mı geliyorsun? seni kayıt ol kısmına alalım hemen...
          </p>
        </Link>

        <label for="username">kullanıcı adı</label>
        <input
          type="text"
          className="registerLoginInput"
          placeholder="seni burda görmek bize şeref verdi..."
          name="username"
          value={loginValues.username}
          onChange={handleLoginChange}
          required
        />

        <label for="password">şifre</label>
        <input
          type="password"
          className="registerLoginInput"
          placeholder="şifreyi hatırlıyorsan bizi çok memnun edersin..."
          name="password"
          value={loginValues.password}
          onChange={handleLoginChange}
          required
        />

        <div className="registerLoginButtonField loginPart">
          <button
            className="registerLoginButton"
            type="submit"
            onClick={handleLoginSubmit}
          >
            artık resmen hoş geldin !
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
