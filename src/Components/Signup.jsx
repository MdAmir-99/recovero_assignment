import React, { useState, useEffect } from 'react'
import './signup.css';
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const SignUp = () =>
{
  const navigate = useNavigate();
  const [ adminData, setAdminData ] = useState( {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: ""
  } );

  const [ error, setError ] = useState( "" )

  // handle inputs 
  let name, value;

  const handleInputs = ( e ) =>
  {
    e.persist();
    name = e.target.name;
    value = e.target.value;

    setAdminData( { ...adminData, [ name ]: value } );
  };


  // Send Data to FontEnd

  const PostData = async ( e ) =>
  {
    e.preventDefault();

    const url = `http://localhost:5000/user/register`
    // const url = "https://admin-dashboard-backend-production.up.railway.app/products";
    const config = {
      method: "POST",
      data: JSON.stringify( adminData ),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try
    {
      const { data } = await axios( url, config );

      if ( data.status === true )
      {
        toast.success( data.message, {
          position: toast.POSITION.TOP_CENTER,
        } );
        setAdminData( data.data )
        navigate( "/login" );
      }
    } catch ( err )
    {
      toast.error( err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      } )

      setError( err.response.data.message );
    }

  }

  return (
    <div className="signup_container">
      <div className="signup_header">
        <form
          method="POST"
          className="signup_form"
          onSubmit={ PostData }
        >
          <h2 className="signup_form_heading">SignUp</h2>
          <div className="signup_formGroup">
            <input
              placeholder="Enter Name..."
              type="text"
              name="fullName"
              value={ adminData.fullName }
              onChange={ handleInputs }
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <input
              placeholder="Enter Email..."
              type="text"
              name="email"
              value={ adminData.email }
              onChange={ handleInputs }
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <input
              placeholder="Enter Password..."
              type="password"
              name="password"
              value={ adminData.password }
              onChange={ handleInputs }
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <input
              placeholder="Enter Password..."
              type="password"
              name="confirmPassword"
              value={ adminData.confirmPassword }
              onChange={ handleInputs }
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <input
              placeholder="Enter Mobile..."
              name="mobile"
              value={ adminData.mobile }
              onChange={ handleInputs }
              type="number"
              className="signup_form_input"
            />
          </div>
          <div className="signup_formGroup">
            <Button
              variant="contained"
              type="submit"
              name="addMember"
              id="signup_btn"
            >
              SignUp
            </Button>
          </div>
          { error && <span className="signup_error_message">{ error }</span> }
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp