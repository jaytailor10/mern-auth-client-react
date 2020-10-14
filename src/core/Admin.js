import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { getCookie, isAuth, signout, updateUser } from "../auth/helpers";

function Admin({ history }) {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  function loadProfile() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Profile Update", response);
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        console.log("Private Profile Update Error", error.response.data.error);
        if (error.response.status === 401) {
          console.log("YOU Have been signed out 401");
          signout(() => {
            history.push("/");
          });
        }
      });
  }

  const { role, name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/admin/update`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password },
    })
      .then((response) => {
        console.log("PROFILE UPDATE SUCCESS", response);

        updateUser(response, () => {
          setValues({
            ...values,

            buttonText: "Submitted",
          });
          toast.success("PROFILE UPDATED SUCCESSFULLY");
        });
      })
      .catch((err) => {
        console.log("PROFILE UPDATED ERROR", err.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(err.response.data.err);
      });
  };

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Role</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          defaultValue={role}
          disabled
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          defaultValue={email}
          disabled
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
      <div className="col-d-6 offset-md-3">
        <ToastContainer />

        {/* {JSON.stringify({ name, email, password })} */}
        <h1 className="pt-5 text-centre">Admin</h1>
        <p className="lead text-centre"> Profile Update</p>
        {updateForm()}
      </div>
    </Layout>
  );
}

export default Admin;

///////////////////////////////////////////////////////////////////////////////////
