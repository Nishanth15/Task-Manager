import React, { useEffect } from 'react';
// import validate from './validate';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { authenticationService } from '../../services/auth.service';
import { useHistory } from 'react-router-dom';

function SignIn() {
    let history = useHistory();

    useEffect(() => {
        checkAvailability();
    }, []);

    function checkAvailability() {
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
    }

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
            <div className="onboard_frame">
                <form onSubmit={formik.handleSubmit}>
                    <div className="onboard_form">
                        <h1 className="heading">
                            <span>Log In</span>
                            <br />
                            <span>Task Manager</span>
                        </h1>
                        <div className="form_field">
                            <label>Email</label>
                            <input
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
                            <input
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
                            Sign in 🚀
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
                            Don't you have an account?
                            <Link className="link" to="/signup">
                                Sign up now!
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
