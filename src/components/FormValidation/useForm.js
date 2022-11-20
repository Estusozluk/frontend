import React, { useState } from 'react'

const useForm = () => {

    const [registerLoginValues, setRegisterLoginValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = e => {

        const {name, value} = e.target;

        setRegisterLoginValues({
            ...registerLoginValues,
            [name]: value
        })
    }

    function validateInfo(registerLoginValues){
        let errors = {};

        if(!registerLoginValues.username.trim()){
            errors.username = 'kullanıcı adı yok ?!'
        }

        if(!registerLoginValues.email){
            errors.email = 'email yok ?!'
        }
        else if(!/\S+@\S+\.\S+/.test(registerLoginValues.email)){
            errors.email = 'e bu email yanlış ?!'
        }

        if(!registerLoginValues.password){
            errors.password = 'e şifre yok ?!'
        }
        else if(registerLoginValues.password < 3){
            errors.password = 'daha uzun bir şifre gir'
        }
        else if(registerLoginValues.password > 15){
            errors.password = 'daha kısa bir şifre gir'
        }
        



        return errors;

    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);
    }


    return {handleChange, handleSubmit, validateInfo}
}

export default useForm
