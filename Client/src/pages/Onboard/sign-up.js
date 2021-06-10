import React from 'react';
import logo from '../../assets/images/shortlogo.svg';
import onboard from '../../assets/images/onboard.svg';
// import validate from './validate';
import { useFormik } from 'formik';
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
        // validate
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
                            Welcome to Task Manager
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
                            </div>
                            {formik.touched.firstName &&
                            formik.errors.firstName ? (
                                <div>{formik.errors.firstName}</div>
                            ) : null}

                            <div className="form_field">
                                <label>Last Name</label>

                                <Input
                                    type="text"
                                    className="form_control"
                                    name="lastName"
                                    {...formik.getFieldProps('lastName')}
                                />
                            </div>
                            {formik.touched.lastName &&
                            formik.errors.lastName ? (
                                <div>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        <div className="form_field">
                            <label>Email</label>
                            <Input
                                type="text"
                                className="form_control"
                                name="email"
                                {...formik.getFieldProps('email')}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}

                        <div className="form_field">
                            <label>Password</label>
                            <Input.Password
                                type="password"
                                className="form_control"
                                name="password"
                                {...formik.getFieldProps('password')}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                        <div className="form_field">
                            <label>Confirm Password</label>
                            <Input.Password
                                type="password"
                                className="form_control"
                                name="Vpassword"
                                {...formik.getFieldProps('Vpassword')}
                            />
                        </div>
                        {formik.touched.Vpassword && formik.errors.Vpassword ? (
                            <div>{formik.errors.Vpassword}</div>
                        ) : null}

                        <button type="submit" className="form_button">
                            Sign up
                        </button>

                        <div className="terms">
                            By signing up, you agree to the
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
                            Already have an account?
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
