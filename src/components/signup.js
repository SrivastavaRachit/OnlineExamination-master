import { Formik } from "formik";
import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import Swal from "sweetalert2";
import app_config from "../config";
import '../stylesheets/signup.css';
export default function signup() {
  const url = app_config.api_url;

  const signupform = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  };

  const formSubmit = (values) => {
    console.log(values);

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    // request on server and parse the json response
    fetch(url + "/user/add", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "success") {
          Swal.fire({
            icon: "success",
            title: "Registered!",
            text: "Now Login to Continue",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong",
          });
        }
      });
  };

  return (
    <div className="main-w3layouts wrapper">
      <h1>Creative SignUp Form</h1>
      <div className="main-agileinfo">
        <div className="agileits-top">
          <Formik initialValues={signupform} onSubmit={formSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <label className="mt-3">Name</label>
                <input
                  className="text"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                />

                <label className="mt-3">Email</label>
                <input
                  className="text email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                />

                <label className="mt-3">Password</label>
                <input
                  className="text"
                  type="password"

                  onChange={handleChange}
                  value={values.password}
                  name="password"
                />

                <button type="submit" className="btn btn-primary mt-5">
                  Submit
                </button>
              </form>
            )}
          </Formik>
          <p>
            Don't have an Account?
            <BrowserRouter>
              {" "}
              <Link to="/login"> Login Now!</Link>
            </BrowserRouter>
          </p>
        </div>

        <div className="colorlibcopy-agile">
          <p>
            © 2018 Colorlib Signup Form. All rights reserved | Design by{" "}
            <a href="https://colorlib.com/" target="_blank">
              Colorlib
            </a>
          </p>
        </div>

        <ul className="colorlib-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
