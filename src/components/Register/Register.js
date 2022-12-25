import React from "react";
import "./Register.css";
import useForm from "../FormValidation/useForm";
import ErrorModal from "../Modals/Error/ErrorModal";

const Register = () => {
  const {
    handleChange,
    handleRegisterSubmit,
    validateInfo,
    registerValues,
    error,
    setError,
  } = useForm();

  const confirm = () => {
    setError(null);
  };

  return (
    <div className="register">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          confirm={confirm}
        />
      )}

      <form className="registerLoginForm">
        <h2 className="registrationLoginTitle">
          hoş geldiniz, gelin sizi kayit edelim
        </h2>

        <label for="username">kullanıcı adı</label>
        <input
          type="text"
          className="registerLoginInput"
          placeholder="lütfen düzgün bir tercih yapınız..."
          name="username"
          onChange={handleChange}
          value={registerValues.username}
        />

        <label for="username">email</label>
        <input
          type="text"
          className="registerLoginInput"
          placeholder="herhalde gerçek mail adresini girersin..."
          name="email"
          onChange={handleChange}
          value={registerValues.email}
        />

        <label for="username">şifre</label>
        <input
          type="password"
          className="registerLoginInput"
          placeholder="güçlü ve unutulmayacak bir şifre seç..."
          name="password"
          onChange={handleChange}
          value={registerValues.password}
        />

        <p className="passwordConditions">
          şifre kuralları:
          <p>büyük harf</p>
          <p>sayı</p>
          <p>3'den az ama 15'den fazla da olmasın</p>
        </p>

        <div className="registerLoginButtonField">
          <button
            className="registerLoginButton"
            onClick={handleRegisterSubmit}
          >
            hadi başlayalım !!!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
