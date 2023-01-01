import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/userSlice";
import RequestService from "../../services/RequestService";

const useForm = () => {
  const dispatch = useDispatch();

  const [registerValues, setRegisterValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [isEmpty, setIsEmpty] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterValues({
      ...registerValues,
      [name]: value,
    });
  };

  const checkEmpty = () => {
    if (loginValues.username === "" && loginValues.password !== "") {
      setError({
        title: "Başarısız işlem",
        message: "Username boş olamaz",
      });
    }

    if (loginValues.username !== "" && loginValues.password === "") {
      setError({
        title: "Başarısız işlem",
        message: "Password boş olamaz",
      });
    }

    if (loginValues.username === "" && loginValues.password === "") {
      setError({
        title: "Başarısız işlem",
        message: "Username ve Password boş olamaz",
      });

      setIsEmpty(true);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  function validateInfo(registerValues) {
    let errors = {};

    if (!registerValues.username.trim()) {
      errors.username = "kullanıcı adı yok ?!";
    }

    if (!registerValues.email) {
      errors.email = "email yok ?!";
    } else if (!/\S+@\S+\.\S+/.test(registerValues.email)) {
      errors.email = "e bu email yanlış ?!";
    }

    if (!registerValues.password) {
      errors.password = "e şifre yok ?!";
    } else if (registerValues.password < 3) {
      errors.password = "daha uzun bir şifre gir";
    } else if (registerValues.password > 15) {
      errors.password = "daha kısa bir şifre gir";
    }

    return errors;
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    RequestService.post("api/User", registerValues, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setError({
            title: "İşlem başarılı",
            message: "Başarıyla kayıt oldunuz",
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    await RequestService.post("api/User/login", loginValues, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
      },
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userid);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("follower", res.data.followerCount);
        localStorage.setItem("following", res.data.followedCount);
        localStorage.setItem("badies", res.data.badieCount);
        localStorage.setItem("email", res.data.email);

        console.log(localStorage.getItem("follower"));
        let token = localStorage.getItem("token");
        if (token !== null) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setError({
            title: "Başarısız işlem",
            message: "Yanlış giriş bilgileri",
          });
        }
      });
  };

  if (isLoggedIn) {
    dispatch(
      login({
        username: loginValues.username,
        password: loginValues.password,
        loggedIn: setIsLoggedIn(true),
      })
    );

    navigate("/profile");
  }

  return {
    handleChange,
    handleRegisterSubmit,
    handleLoginChange,
    validateInfo,
    handleLoginSubmit,
    registerValues,
    loginValues,
    error,
    setError,
    isLoggedIn,
  };
};

export default useForm;
