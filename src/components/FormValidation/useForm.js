import axios from 'axios';
import React, { useState } from 'react'

const useForm = () => {

    const [registerValues, setRegisterValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loginValues, setLoginValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = e => {

        const {name, value} = e.target;

        setRegisterValues({
            ...registerValues,
            [name]: value
        })
    }

    const handleLoginChange = e => {
        const {name, value} = e.target;

        setLoginValues({
            ...loginValues,
            [name]: value
        })
    }

    function validateInfo(registerValues){
        let errors = {};

        if(!registerValues.username.trim()){
            errors.username = 'kullanıcı adı yok ?!'
        }

        if(!registerValues.email){
            errors.email = 'email yok ?!'
        }
        else if(!/\S+@\S+\.\S+/.test(registerValues.email)){
            errors.email = 'e bu email yanlış ?!'
        }

        if(!registerValues.password){
            errors.password = 'e şifre yok ?!'
        }
        else if(registerValues.password < 3){
            errors.password = 'daha uzun bir şifre gir'
        }
        else if(registerValues.password > 15){
            errors.password = 'daha kısa bir şifre gir'
        }
        



        return errors;

    }

    const handleRegisterSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);


        axios.post("https://localhost:5001/api/User", registerValues, {
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
              "Access-Control-Allow-Headers": "Content-Type, x-requested-with"
            }
          }).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }


    const handleLoginSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);


        axios.post("https://localhost:5001/api/User/login", loginValues, {
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
              "Access-Control-Allow-Headers": "Content-Type, x-requested-with"
            }
          }).then(
            res => {
                console.log(res)
            }
          ).catch(
            err => {
                console.log(err)
            }
          )
    }


    return {handleChange, handleRegisterSubmit, handleLoginChange, validateInfo, handleLoginSubmit, registerValues}
}

export default useForm
