import React from "react";
// import "../stylesheets/Login.css";
import { Formik } from "formik";
import Swal from "sweetalert2";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import app_config from "../config";

const myStyles = makeStyles(() => ({
  mycard: {
    marginTop: "10rem",
    boxShadow:
      "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
  },
}));

const Login = () => {
  const url = app_config.api_url;
  const classes = myStyles();

  const loginform = {
    email: "",
    password: "",
  };

  const formSubmit = (values) => {
    fetch(url + "/user/getbyemail/" + values.email)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);

          if (data.password == values.password) {
            console.log("login success");

            Swal.fire({
              icon: "success",
              title: "Login Success",
            });

            sessionStorage.setItem("user", JSON.stringify(data));
            window.location.replace("/addpaper");

            return;
          }
        }

        Swal.fire({
          icon: "error",
          title: "Email or Password Incorrect",
        });
      });
  };

  return (
    <div className="container mt-5">
      <div className="col-md-3 mx-auto">
        <div className="card">
          <div className="card-body">
            <div class="avatar">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgPTkZXy_59HnXdy7xdeNUtuAMc_r3mP9Vpw&usqp=CAU" />
            </div>

            <Formik initialValues={loginform} onSubmit={formSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  {/* <input type="text" placeholder="username" required/> */}
                  <label className="mt-5 w-100">Email</label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                  />
                  <div class="bar">
                    <i></i>
                  </div>
                  {/* <input type="password" placeholder="password" required/> */}
                  <label className="mt-4">Password</label>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    name="password"
                  />
                  <a href="" class="forgot_link">
                    forgot ?
                  </a>
                  <button type="submit" className="btn btn-primary w-100">
                    Sign in
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
