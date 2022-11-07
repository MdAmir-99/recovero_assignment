import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {

  const [theme, SetTheme] = useState('light-theme')

  const changeTheme = () => {
    if(theme === 'dark-theme'){
      SetTheme('light-theme')
    }
    else{
      SetTheme('dark-theme');
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme])


  const navigate = useNavigate();
  const isLogin = localStorage.getItem("admin");
  // console.log(isLogin);
  let fName, image;
  
  if(isLogin !== null){
    const data = JSON.parse(isLogin);
    fName = data.lastName;
    image = data.profileImage;
    // console.log(image, "IMAGE")
  }


  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="logo">
        <NavLink to="/">
          <h3>ADMIN</h3>
        </NavLink>
      </div>
      <div className="menu">
        <Tooltip title="Change Theme">
          <DarkModeIcon onClick={changeTheme} className="Nav_icon" fontSize="small"/>
        </Tooltip>
        {isLogin ? (
          <>
            <NavLink onClick={logout} to="/login">
              Logout
            </NavLink>
            <span className="user_name">Welcome , {fName}</span>
            <span className="user_img"><img src={image} alt="ProfileImage" id="img"></img></span>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>{" "}
            <NavLink to="/signup">SignUp</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
