export const validateSignUp = (values) => {
    const errors = {};

    // console.log(values);
    /* validating first name */
    if (!values.firstName) {
        errors.firstName = (
            <div className="field_wrong"> First name is required</div>
        );
    } else if (values.firstName.length < 1) {
        errors.firstName = (
            <div className="field_wrong">Invalid First name </div>
        );
    }

    /* validating last name */
    if (!values.lastName) {
        errors.lastName = (
            <div className="field_wrong"> Last name is required</div>
        );
    } else if (values.lastName.length < 1) {
        errors.lastName = <div className="field_wrong"> Invalid Last name</div>;
    }

    /* validating email using regex to pass email */
    if (!values.email) {
        errors.email = (
            <div className="field_wrong"> Email address is required</div>
        );
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = (
            <div className="field_wrong"> Invalid email address</div>
        );
    }

    /* validating passwords */
    if (!values.password) {
        errors.password = (
            <div className="field_wrong"> Password is required</div>
        );
    } else if (values.password.length <= 6) {
        errors.password = (
            <div className="field_wrong"> Password length is weak 😩</div>
        );
    }

    /* validating password verification with initial */
    if (!values.Vpassword) {
        errors.Vpassword = (
            <div className="field_wrong"> Invalid password verification</div>
        );
    } else if (values.Vpassword !== values.password) {
        errors.Vpassword = (
            <div className="field_wrong"> Passwords don't match 😟</div>
        );
    }

    return errors;
};

export const validateSignIn = (values) => {
    const errors = {};

    /* validating email using regex to pass email */
    if (!values.email) {
        errors.email = (
            <div className="field_wrong"> Email address is required</div>
        );
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = (
            <div className="field_wrong"> Invalid email address</div>
        );
    }

    /* validating passwords */
    if (!values.password) {
        errors.password = (
            <div className="field_wrong"> Password is required</div>
        );
    } else if (values.password.length <= 6) {
        errors.password = (
            <div className="field_wrong"> Password length is weak 😩</div>
        );
    }

    return errors;
};
