import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from '../assets/profile.png';

const Navbar = () =>
{

  const [ theme, SetTheme ] = useState( 'dark-theme' )

  const changeTheme = () =>
  {
    if ( theme === 'dark-theme' )
    {
      SetTheme( 'light-theme' )
    }
    else
    {
      SetTheme( 'dark-theme' );
    }
  }

  useEffect( () =>
  {
    document.body.className = theme;
  }, [ theme ] )


  const navigate = useNavigate();
  const isLogin = localStorage.getItem( "user" );
  // console.log(isLogin);
  let fName, image;

  if ( isLogin !== null )
  {
    const data = JSON.parse( isLogin );
    fName = data.lastName;
    image = data.profileImage;
    // console.log(image, "IMAGE")
  }


  const logout = () =>
  {
    localStorage.clear();
    toast.success( "Logout Successfully !", {
      position: toast.POSITION.TOP_CENTER,
    } );
    navigate( "/login" );
  };

  return (
    <>
      <div className="main">
        <div className="logo">
          <NavLink to="/">
            <h3>ADMIN</h3>
          </NavLink>
        </div>
        <div className="menu">
          {/* <Tooltip title="Change Theme">
          <DarkModeIcon onClick={ changeTheme } className="Nav_icon" fontSize="small" />
        </Tooltip> */}
          { ( theme == "dark-theme" ) ?
            <Tooltip title="Light Theme">
              <DarkModeIcon
                onClick={ changeTheme }
                className="Nav_icon"
                fontSize="small"
              />
            </Tooltip>
            :
            <Tooltip title="Dark Theme">
              <Brightness7Icon
                onClick={ changeTheme }
                className="Nav_icon"
                fontSize="small" />
            </Tooltip> }
          { isLogin ? (
            <>
              <NavLink onClick={ logout } to="/login">
                Logout
              </NavLink>
              <span className="user_name">Welcome , { fName }</span>
              <span className="user_img"><img src={ Image } alt="ProfileImage" id="img"></img></span>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>{ " " }
              <NavLink to="/signup">SignUp</NavLink>
            </>
          ) }
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
