//npm install react-toastify, npm install axios
import React, { useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "./helpers";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Google from "./Google";
import Facebook from "./Facebook";



function Signin({ history }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/private");
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);

        //save the response(user in localstorage,token in cookie)
        authenticate(response, () => {
          setValues({
            ...values,

            email: "",
            password: "",
            buttonText: "Submitted",
          });
          // toast.success(`Hey ${response.data.user.name}, Welcome back`);
          //if I didnt put history.push() in () it was not pushing me directly to the admin page
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/private");
        });
      })
      .catch((err) => {
        console.log("SIGNIN ERROR", err.response.data);
        setValues({ ...values, buttonText: "Submit" });
        // toast.error(err.response.data.err);
      });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <div className="btn btn-primary" onClick={clickSubmit}>
        {buttonText}
      </div>
    </form>
  );

  return (
    <Layout>
      {/* {JSON.stringify(isAuth())} */}

      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        {/* {JSON.stringify({ email, password })} */}

        <h1 className="p-5 text-centre">Signin</h1>
        <Google informParent={informParent} />
        <Facebook informParent={informParent} />

        {signinForm()}
        <br />
        <Link
          to="/auth/password/forgot"
          className="btn btn-sm btn-outline-danger"
        >
          Forgot Password
        </Link>
      </div>
    </Layout>
  );
}

export default Signin;
