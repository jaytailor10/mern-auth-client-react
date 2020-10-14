//npm install react-toastify, npm install axios
import React, { useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";

function Forgot({ history }) {
  const [values, setValues] = useState({
    email: "",

    buttonText: "Request password reset link",
  });

  const { email, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    console.log("send request");

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })

      .catch((err) => {
        console.log("FORGOT PASSWORD ERROR", err.response.data);

        toast.error(err.response.data.error);
        setValues({ ...values, buttonText: "Request password reset link" });
        // toast.error(err.response.data.err);
      });
  };

  const passwordForgotForm = () => (
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

        {/* {JSON.stringify({ email, password })} */}
        <h1 className="p-5 text-centre">Forgot Password</h1>
        {passwordForgotForm()}
      </div>
    </Layout>
  );
}

export default Forgot;
