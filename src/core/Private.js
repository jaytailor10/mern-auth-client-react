import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { getCookie, isAuth, signout, updateUser } from "../auth/helpers";

function Private({ history }) {
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
      url: `${process.env.REACT_APP_API}/user/update`,

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
        <h1 className="pt-5 text-centre">Private</h1>
        <p className="lead text-centre"> Profile Update</p>
        {updateForm()}
      </div>
    </Layout>
  );
}

export default Private;

///////////////////////////////////////////////////////////////////////////////////

//Ryan code

// import React, { useState, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
// import Layout from "../core/Layout";
// import axios from "axios";
// import { isAuth, getCookie, signout } from "../auth/Helpers";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";

// const Private = ({ history }) => {
//   const [values, setValues] = useState({
//     role: "",
//     name: "",
//     email: "",
//     password: "",
//     buttonText: "Submit",
//   });

//   const token = getCookie("token");

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = () => {
//     axios({
//       method: "GET",
//       url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         console.log("PRIVATE PROFILE UPDATE", response);
//         const { role, name, email } = response.data;
//         setValues({ ...values, role, name, email });
//       })
//       .catch((error) => {
//         console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
//         if (error.response.status === 401) {
//           signout(() => {
//             history.push("/");
//           });
//         }
//       });
//   };

//   const { role, name, email, password, buttonText } = values;

//   const handleChange = (name) => (event) => {
//     // console.log(event.target.value);
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const clickSubmit = (event) => {
//     event.preventDefault();
//     setValues({ ...values, buttonText: "Submitting" });
//     axios({
//       method: "PUT",
//       url: `${process.env.REACT_APP_API}/user/update`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       data: { name, password },
//     })
//       .then((response) => {
//         console.log("PRIVATE PROFILE UPDATE SUCCESS", response);
//         updateUser(response, () => {
//           setValues({ ...values, buttonText: "Submitted" });
//           toast.success("Profile updated successfully");
//         });
//       })
//       .catch((error) => {
//         console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
//         setValues({ ...values, buttonText: "Submit" });
//         toast.error(error.response.data.error);
//       });
//   };

//   const updateForm = () => (
//     <form>
//       <div className="form-group">
//         <label className="text-muted">Role</label>
//         <input
//           defaultValue={role}
//           type="text"
//           className="form-control"
//           disabled
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Name</label>
//         <input
//           onChange={handleChange("name")}
//           value={name}
//           type="text"
//           className="form-control"
//         />
//       </div>

//       <div className="form-group">
//         <label className="text-muted">Email</label>
//         <input
//           defaultValue={email}
//           type="email"
//           className="form-control"
//           disabled
//         />
//       </div>

//       <div className="form-group">
//         <label className="text-muted">Password</label>
//         <input
//           onChange={handleChange("password")}
//           value={password}
//           type="password"
//           className="form-control"
//         />
//       </div>

//       <div>
//         <button className="btn btn-primary" onClick={clickSubmit}>
//           {buttonText}
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <Layout>
//       <div className="col-md-6 offset-md-3">
//         <ToastContainer />
//         <h1 className="pt-5 text-center">Private</h1>
//         <p className="lead text-center">Profile update</p>
//         {updateForm()}
//       </div>
//     </Layout>
//   );
// };

// export default Private;

////////////////////////////////////////////////////////////////////////////////
