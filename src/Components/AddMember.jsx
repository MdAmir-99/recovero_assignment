import React, { useState, useEffect } from 'react'
import './addMember.css';
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AddMember = () =>
{
  const navigate = useNavigate();
  const [ role, setRole ] = useState( 'USER' )
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
      data: JSON.stringify( adminData, role ),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try
    {
      const { data } = await axios( url, config );

      if ( data.status === true )
      {
        toast.success( 'member added succussfully', {
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
    <>
      <div className="signup_container">
        <button className="back_btn" onClick={ () => navigate( '/adminDashboard' ) }>BACK</button>
        <div className="signup_header">

          <form
            method="POST"
            className="signup_form"
            onSubmit={ PostData }
          >
            <h2 className="signup_form_heading">Add Member</h2>
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
                Add
              </Button>
            </div>
            { error && <span className="signup_error_message">{ error }</span> }
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default AddMember