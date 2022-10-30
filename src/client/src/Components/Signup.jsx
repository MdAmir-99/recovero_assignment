import React, { useState, useEffect } from "react";
import "./signup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [error, setError] = useState("");
  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    e.persist();
    name = e.target.name;
    value = e.target.value;

    setAdmin({ ...admin, [name]: value });
  };

  const handleImage = (e) => {
    console.warn(e.target.files[0]);
    setImage({ image: e.target.files[0] });
  };

  const PostData = async (e) => {
    e.preventDefault();
    // console.log(admin)
    // console.log(image)

    const formData = new FormData();
    formData.append("firstName", admin.firstName);
    formData.append("lastName", admin.lastName);
    formData.append("email", admin.email);
    formData.append("password", admin.password);
    formData.append("confirmPassword", admin.confirmPassword);
    formData.append("mobile", admin.mobile);
    formData.append("profileImage", image.image);

    const url = "/register";
    const config = {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios(url, config);
      if (response.status >= 400) {
        setError(response.data.message);
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("signup Failed");
      } 
      else {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        // localStorage.setItem("admin" , JSON.stringify(response.data.data))
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_header">
        <form
          method="POST"
          className="signup_form"
          encType="multipart/form-data"
        >
          <h2 className="signup_form_heading">SingUP</h2>
          <div className="signup_formGroup">
            <TextField
              name="firstName"
              value={admin.firstName}
              onChange={handleInputs}
              label="First Name"
              variant="standard"
              inputProps={{ style: { color: "orange" } }}
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <TextField
              name="lastName"
              value={admin.lastName}
              onChange={handleInputs}
              label="Last Name"
              variant="standard"
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <TextField
              name="email"
              value={admin.email}
              onChange={handleInputs}
              label="Email"
              type="email"
              variant="standard"
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <TextField
              name="password"
              value={admin.password}
              onChange={handleInputs}
              label="Password"
              type="password"
              variant="standard"
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <TextField
              name="confirmPassword"
              value={admin.confirmPassword}
              onChange={handleInputs}
              label="Confirm Password"
              type="password"
              variant="standard"
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <TextField
              name="mobile"
              value={admin.mobile}
              onChange={handleInputs}
              label="Mobile Number"
              inputProps={{ style: { color: "orange" } }}
              color="warning"
              type="number"
              variant="standard"
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <TextField
              name="profileImage"
              value={image.name}
              onChange={handleImage}
              label="Profile Image"
              type="file"
              variant="standard"
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <Button
              variant="contained"
              type="submit"
              name="signup"
              onClick={PostData}
              id="signup_btn"
            >
              SIGNUP
            </Button>
          </div>
          {error && <span className="signup_error_message">{error}</span>}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
