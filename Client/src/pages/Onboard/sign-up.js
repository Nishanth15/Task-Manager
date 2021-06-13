import React from 'react';
import logo from '../../assets/images/logo.svg';
import onboard from '../../assets/images/onboard.svg';
import { validateSignUp as validate } from './validate';
import { Form, useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { authenticationService } from '../../services/auth.service';
import { Input } from 'antd';

const SignUp = () => {
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            Vpassword: '',
            phoneNo: '',
        },
        validate,
        onSubmit: (values) => {
            console.log(values);
            var registerDetails = {
                firstName: values.firstName,
                lastName: values.lastName,
                emailId: values.email,
                password: values.password,
                phoneNo: values.phoneNo,
            };
            authenticationService.register(registerDetails).then((response) => {
                if (response.success) history.push('/login');
                else console.log(response.message);
            });
        },
    });

    return (
        <div className="onboard">
            <div className="onboard_image_left">
                <img
                    className="onboard_image"
                    src={onboard}
                    alt="taskManager"
                />
            </div>
            <div className="onboard_frame">
                <form onSubmit={formik.handleSubmit}>
                    <div className="onboard_form">
                        <h1 className="heading">
                            <img
                                className="onboard_logo"
                                src={logo}
                                alt="taskManager"
                            />
                            Sign up to TaskManager
                        </h1>
                        <div className="flex space-x-2 justify-between">
                            <div className="form_field">
                                <label>First Name</label>
                                <Input
                                    type="text"
                                    className="form_control"
                                    name="firstName"
                                    {...formik.getFieldProps('firstName')}
                                />
                                {formik.touched.firstName &&
                                formik.errors.firstName ? (
                                    <div className="field_error">
                                        {formik.errors.firstName}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form_field">
                                <label>Last Name</label>
                                <Input
                                    type="text"
                                    className="form_control"
                                    name="lastName"
                                    {...formik.getFieldProps('lastName')}
                                />
                                {formik.touched.lastName &&
                                formik.errors.lastName ? (
                                    <div className="field_error">
                                        {formik.errors.lastName}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="form_field">
                            <label>Email</label>
                            <Input
                                type="text"
                                className="form_control"
                                name="email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="field_error">
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div>
                        <div className="form_field">
                            <label>Password</label>
                            <Input.Password
                                type="password"
                                className="form_control"
                                name="password"
                                placeholder="6+ characters"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className="field_error">
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </div>
                        <div className="form_field">
                            <label>Confirm Password</label>
                            <Input.Password
                                type="password"
                                className="form_control"
                                name="Vpassword"
                                placeholder="6+ characters"
                                {...formik.getFieldProps('Vpassword')}
                            />
                            {formik.touched.Vpassword &&
                            formik.errors.Vpassword ? (
                                <div className="field_error">
                                    {formik.errors.Vpassword}
                                </div>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                            className="form_button"
                        >
                            Sign up
                        </button>
                        <div className="terms">
                            By continuing, you agree to TaskManager's
                            <br />
                            <a className="link" href="/">
                                Terms of Service
                            </a>
                            and
                            <a className="link" href="/">
                                Privacy Policy
                            </a>
                            .
                        </div>
                    </div>
                    <div className="change_onboard">
                        <div className="terms">
                            Already a member?
                            <Link className="link" to="/login">
                                Log In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
