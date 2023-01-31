import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useSelector, useDispatch } from "react-redux";

import { publishLogin } from "../../../../features/login/loginSlice";

import "./LoginForm.css";

const initalValues = {
    email: "",
    password: ""
  };

const LoginForm = () => {
    const { status, login, error } = useSelector((store) => store.login);

    const [orderEmail, setOrderEmail] = useState('');
    const [orderPassword, setOrderPassword] = useState('');

    const dispatch = useDispatch();

    const collectFormData = (even) => {
        even.preventDefault();
        
        switch (even.target.name) {
            case 'email': setOrderEmail(even.target.value);
            break
            case 'password': setOrderPassword(even.target.value);
            break
            default: console.log('Something went wrong with input values')
        }
    };

    const loginSubmit = () => {

        const loginData = {
            "email": orderEmail,
            "password": orderPassword
        }

        dispatch(publishLogin(loginData))
    };

    if (status === 'succeeded' && login) {
        return (
            <div className="login">
                <h5>You were successfuly loged in</h5>
            </div>
        )
    } 
    if (status === 'succeeded' && !login) {
        return (
            <div className="login">
                <h5>Acces denied. Check your login data and try again</h5>
                <div>
                    <Formik
                        initialValues={initalValues}
                        validationSchema={object({
                        email: string().required("Please enter email").email("Invalid email"),
                        password: string()
                            .required("Please enter password")
                            .min(7, "password should be at least 7 characters long"),
                        })}
                        onSubmit={(values, formikHelpers) => {
                        formikHelpers.resetForm();
                        }}
                    >
                        {({ errors, isValid, touched, dirty }) => (
                        <Form onChange={collectFormData} className='checkout-form'>
                            <Field
                                name="email"
                                type="email"
                                as={TextField}
                                variant="outlined"
                                color="primary"
                                label="Email (name@mailbox.com)"
                                autoComplete='off'
                                error={Boolean(errors.email) && Boolean(touched.email)}
                                helperText={Boolean(touched.email) && errors.email}
                            />
                            <Field
                                name="password"
                                type="password"
                                as={TextField}
                                variant="outlined"
                                color="primary"
                                label="Password (letters, numbers, signs)"
                                autoComplete='off'
                                error={Boolean(errors.password) && Boolean(touched.password)}
                                helperText={Boolean(touched.password) && errors.password}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{backgroundColor: 'black'}}
                                size="large"
                                onClick={loginSubmit}
                                disabled={!isValid || !dirty}
                            >
                                LogIn
                            </Button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    } 
    if (status !== 'succeeded' && error !== null) {
        return (
            <div className="login">
                <h5>{error}</h5>
            </div>
        )
    }
    if (status !== 'succeeded' && error === null) {
        return (
            <div className="login">
                <h5>Please log in here</h5>
                <div>
                    <Formik
                        initialValues={initalValues}
                        validationSchema={object({
                        email: string().required("Please enter email").email("Invalid email"),
                        password: string()
                            .required("Please enter password")
                            .min(7, "password should be at least 7 characters long"),
                        })}
                        onSubmit={(values, formikHelpers) => {
                        formikHelpers.resetForm();
                        }}
                    >
                        {({ errors, isValid, touched, dirty }) => (
                        <Form onChange={collectFormData} className='checkout-form'>
                            <Field
                                name="email"
                                type="email"
                                as={TextField}
                                variant="outlined"
                                color="primary"
                                label="Email (name@mailbox.com)"
                                autoComplete='off'
                                error={Boolean(errors.email) && Boolean(touched.email)}
                                helperText={Boolean(touched.email) && errors.email}
                            />
                            <Field
                                name="password"
                                type="password"
                                as={TextField}
                                variant="outlined"
                                color="primary"
                                label="Password (letters, numbers, signs)"
                                autoComplete='off'
                                error={Boolean(errors.password) && Boolean(touched.password)}
                                helperText={Boolean(touched.password) && errors.password}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{backgroundColor: 'black'}}
                                size="large"
                                onClick={loginSubmit}
                                disabled={!isValid || !dirty}
                            >
                                LogIn
                            </Button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
};

export default LoginForm;

