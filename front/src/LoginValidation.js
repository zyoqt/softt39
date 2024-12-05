function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.email === "") {
        error.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email is not registered";
    }

    if (values.password === "") {
        error.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match";
    }

    return error;
}

export default Validation;