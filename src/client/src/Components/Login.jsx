import React, { useEffect, useState } from "react";
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
      const isLogin = localStorage.getItem('admin');
      if(isLogin){
        navigate('/dashboard')
      }
  },[])
  const AdminLogin = async (e) => {
      e.preventDefault();
      console.log(email,password)
      try{
        const url = '/adminLogin';
        const config = {
          method:"POST",
          data : JSON.stringify({email, password}),
          headers : {
          "Content-Type" : "application/json"
          }
        }
        const response = await axios(url, config);
        console.log(response, "RESPO")
        const data = response.data;
        console.warn(data, "Data")
      
        if(response.status === 200){
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          localStorage.setItem("admin" , JSON.stringify(response.data.data))
          e.target.reset()
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      }
      catch(err){
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
        setError(err.response.data.message);
        console.log(err.response.data.message);
      }
     
      // navigate('/')

  }

  return (
    <div className="login_container">
      <div className="login_header">
        <form className="login_form" onSubmit={AdminLogin}>
          <h2 className="login_form_heading">Login</h2>
          <div className="login_formGroup">
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              variant="standard"
              className="login_form_input"
            />
          </div>
          <div className="login_formGroup">
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="standard"
              className="login_form_input"
            />
          </div>
          <div className="login_formGroup">
            <Button variant="contained" type="submit" id="login_btn">
              LOGIN
            </Button>
          </div>
          {error && <span className="signup_error_message">{error}</span>}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
