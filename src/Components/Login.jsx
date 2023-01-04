import React, { useEffect, useState } from "react";
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () =>
{
  const [ error, setError ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const navigate = useNavigate();
  useEffect( () =>
  {
    const localData = localStorage.getItem( 'user' );
    const user = JSON.parse( localData );
    if ( localData )
    {
      user.role === 'ADMIN' ? navigate( '/adminDashboard' ) : navigate( '/userDashboard' );
    }
  }, [] )

  const loginHandler = async ( e ) =>
  {
    e.preventDefault();
    try
    {
      const url = "http://localhost:5000/user/login"
      // const url = 'https://admin-dashboard-backend-production.up.railway.app/adminLogin';
      const config = {
        method: "POST",
        data: JSON.stringify( { email, password } ),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const { data } = await axios( url, config );
      // console.log(response, "RESPO")
      // const data = response.data;
      console.warn( data, "Data" )

      if ( data.status === true )
      {
        localStorage.setItem( "user", JSON.stringify( data.data ) )
        console.log( data.data.role, "ROLE" )
        e.target.reset()
        if ( data.data.role === 'ADMIN' )
        {
          toast.success( data.message, {
            position: toast.POSITION.TOP_CENTER,
          } );
          navigate( "/adminDashboard" );
        }
        else
        {
          if ( data.data.role === 'USER' )
          {
            toast.success( data.message, {
              position: toast.POSITION.TOP_CENTER,
            } );
            navigate( "/userDashboard" );
          }
        }
      }
    }
    catch ( err )
    {
      toast.error( err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      } )
      setError( err.response.data.message );
    }


  }

  return (
    <div className="login_container">
      <div className="login_header">
        <form className="login_form" onSubmit={ loginHandler }>
          <h2 className="login_form_heading">Login</h2>
          <div className="login_formGroup">
            <input
              placeholder="Enter Email..."
              type="text"
              value={ email }
              onChange={ ( e ) => setEmail( e.target.value ) }
              className="login_form_input"
            />
          </div>
          <div className="login_formGroup">
            <input
              placeholder="Enter Password..."
              type="password"
              value={ password }
              onChange={ ( e ) => setPassword( e.target.value ) }
              className="login_form_input"
            />
          </div>
          <div className="login_formGroup">
            <Button variant="contained" type="submit" id="login_btn">
              LOGIN
            </Button>
          </div>
          { error && <span className="signup_error_message">{ error }</span> }
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
