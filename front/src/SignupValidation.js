function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.name === "") {
        error.name = "Name is required";
    }

    if (values.email === "") {
        error.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    }

    if (values.password === "") {
        error.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number";
    }

    return error;
}

export default Validation;