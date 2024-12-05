import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (!errors.name && !errors.email && !errors.password) {
      axios
        .post("http://localhost:8082/signup", values)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.error("Error:", err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleInput}
              className="form-control"
            />
            {errors.name && <span className="text-danger small">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control"
            />
            {errors.email && <span className="text-danger small">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className="form-control"
            />
            {errors.password && <span className="text-danger small">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Sign Up</strong>
          </button>
          <p className="text-center mt-3 small">By signing up, you agree to our terms and policies</p>
          <Link
            to="/"
            className="btn btn-outline-primary w-100 mt-2 text-decoration-none"
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
