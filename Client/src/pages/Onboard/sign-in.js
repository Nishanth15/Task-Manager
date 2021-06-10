import '../../styles/onboard.scss';
import logo from '../../assets/images/shortlogo.svg';
import onboard from '../../assets/images/onboard.svg';
import { authenticationService } from '../../services/auth.service';
// import validate from './validate';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

const SignIn = () => {
    let history = useHistory();

    useEffect(() => {
        if (
            localStorage.getItem('accessToken') !== '' &&
            localStorage.getItem('accessToken') != null
        ) {
            let tokenExpiresAt = new Date(
                localStorage.getItem('tokenExpiresAt')
            );
            let currentTime = new Date(Date.now());
            if (tokenExpiresAt <= currentTime) {
                history.push('/login');
            }
        }
    }, [history]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        // validate,
        onSubmit: (values) => {
            authenticationService
                .login(values.email, values.password)
                .then((response) => {
                    if (response.success) {
                        history.push('/inbox');
                    }
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
                            Welcome to Task Manager
                        </h1>
                        <div className="form_field">
                            <label>Email</label>
                            <Input
                                type="text"
                                className="form_control"
                                name="email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form_field">
                            <label>Password</label>
                            <Input.Password
                                type="password"
                                className="form_control"
                                name="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="form_button">
                            Log in
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
                            Not on taskManager yet?
                            <Link className="link" to="/signup">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
