import React,{useEffect} from "react";
import validate from "./validate";
import {Link} from 'react-router-dom';
import { useFormik } from "formik";
import {authenticationService} from '../../services/auth.service';
import { useHistory } from "react-router-dom";



function SignIn() {
let history = useHistory();

useEffect(() => {
  checkAvailability();
})


function checkAvailability()
{
  if (localStorage.getItem('accessToken') !== '' && localStorage.getItem('accessToken') != null) {
    let tokenExpiresAt = new Date(localStorage.getItem('tokenExpiresAt'));
    let currentTime = new Date(Date.now());
    if (tokenExpiresAt <= currentTime) {
     history.push('/sign-in');
    }
  }
}

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    onSubmit: (values) => {
      authenticationService.login(values.email,values.password).then(
        (response) => {
          if(response.success)
          {
            history.push('/inbox');
          }
        }
      );
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign in to Task Manager 🚀</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
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

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            Sign in 🚀
                        </button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a
                                className="no-underline border-b border-grey-dark text-grey-dark"
                                href="/"
                            >
                                Terms of Service
                            </a>
                            and
                            <a
                                className="no-underline border-b border-grey-dark text-grey-dark"
                                href="/"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Don't you have an account? {' '}
                        <Link
                            className="no-underline border-b border-blue text-blue"
                            to="/sign-up"
                        >
                            Sign Up
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignIn;
