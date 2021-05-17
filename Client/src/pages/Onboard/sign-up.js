import React from 'react';
import validate from './validate';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { authenticationService } from '../../services/auth.service';

function SignUp() {
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
                if (response.success) history.push('/sign-in');
                else console.log(response.message);
            });
        },
        // validate
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">
                            Registration 🚀
                        </h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="firstName"
                            placeholder="First Name"
                            {...formik.getFieldProps('firstName')}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="lastName"
                            placeholder="Last Name"
                            {...formik.getFieldProps('lastName')}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password (5 characters and above)"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="Vpassword"
                            placeholder="Confirm Password"
                            {...formik.getFieldProps('Vpassword')}
                        />
                        {formik.touched.Vpassword && formik.errors.Vpassword ? (
                            <div>{formik.errors.Vpassword}</div>
                        ) : null}

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            Create Account 🚀
                        </button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a
                                className="no-underline border-b border-grey-dark text-grey-dark"
                                href="/"
                            >
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a
                                className="no-underline border-b border-grey-dark text-grey-dark"
                                href="/"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?{' '}
                        <Link
                            className="no-underline border-b border-blue text-blue"
                            to="/signin"
                        >
                            Sign In
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignUp;
