//npm install react-toastify, npm install axios
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";

function Reset({ match }) {
  //props.match from react router dom

  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",

    buttonText: "Reset Password",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    //console.log(event.target.value)
    setValues({
      ...values,
      newPassword: event.target.value,
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    console.log("send request");

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "DONE" });
      })
      .catch((err) => {
        console.log("RESET PASSWORD ERROR", err.response.data);

        toast.error(err.response.data.error);
        setValues({ ...values, buttonText: "Reset Password" });
        // toast.error(err.response.data.err);
      });
  };

  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          value={newPassword}
          placeholder="Type new password"
          required
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
        <h1 className="p-5 text-centre">Hey {name}, type your new password</h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
}

export default Reset;
