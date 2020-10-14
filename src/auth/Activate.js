//to activate account
//npm install react-toastify, npm install axios
import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from "jsonwebtoken";

//match is a property of react dom router, browser//important
function Activate({ match }) {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  const { name, token, show } = values;
  useEffect(() => {
    console.log("aaaafe");
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setValues({ ...values, name, token });
    }
    // console.log(token);
  }, []);

  const clickSubmit = (event) => {
    event.preventDefault();
    // setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        setValues({
          ...values,

          show: false,
        });
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log("ACCOUNT ACTIVATION ERROR", err.response.data.err);
        // setValues({ ...values, buttonText: "Submit" });
        toast.error(err.response.data.err);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5 ">Hey {name}, Ready to activate youer account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {/* {JSON.stringify({ name,email, password })} */}
        {/* <h1 className="p-5 text-centre">Activate Account</h1> */}
        {activationLink()}
      </div>
    </Layout>
  );
}

export default Activate;
