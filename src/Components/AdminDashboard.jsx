import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./adminDashboard.css";
import Avatar from "@mui/material/Avatar";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Img from '../assets/profile.png';

const AdminDashboard = () =>
{
  const navigate = useNavigate();
  let [ memberData, setMemberData ] = useState( [] );
  const [ error, setError ] = useState( "" );

  const localData = localStorage.getItem( "user" );
  const user = JSON.parse( localData )
  const token = user.token
  const userId = user._id
  useEffect( () =>
  {
    const isLogin = localStorage.getItem( "user" );
    if ( isLogin == null )
    {
      navigate( "/login" );
    } else
    {
      getData();
    }
  }, [] );

  let firstName, lastName, email, mobile, profileImage;

  const getData = async () =>
  {
    try
    {

      const url = `http://localhost:5000/user/${ userId }`
      // const url = "https://admin-dashboard-backend-production.up.railway.app/products";
      const { data } = await axios.get( url );
      if ( data.status == true )
      {
        setMemberData( data.data );
      }
    } catch ( err )
    {
      console.log( err );
    }
  };


  const deletProduct = async ( id ) =>
  {
    const url = `http://localhost:5000/user/${ userId }`
    // const url = `https://admin-dashboard-backend-production.up.railway.app/products/${ id }`;
    const response = await axios.delete( url );
    // getData();
    toast.error( response.data.message, {
      position: toast.POSITION.TOP_CENTER,
    } );

    memberData = memberData.filter( ( elem ) => { return elem._id !== id } )
    setMemberData( memberData )
  };

  return (
    <div className="dashboard_container">
      <aside className="dashboard_left_section">
        <div className="admin_profile">
          <h3 className="profile_heading">ADMIN PROFILE</h3>
          <div className="admin_data">
            <Avatar
              alt="Remy Sharp"
              src={ Img }
              sx={ { width: 100, height: 100 } }
            />
            <h3>{ `${ user.fullName }` }</h3>
            <h3>{ user.email }</h3>
            <h3>{ user.mobile }</h3>
            <NavLink to="/addmember">
              <button className="addBtn">Add Member</button>
            </NavLink>
          </div>
        </div>
        <div className="social_icons">
          <NavLink to="">
            <TwitterIcon className="icon" fontSize="large" />
          </NavLink>
          <NavLink to="">
            <InstagramIcon className="icon" fontSize="large" />
          </NavLink>
          <NavLink to="">
            <LinkedInIcon className="icon" fontSize="large" />
          </NavLink>
        </div>
      </aside>
      <main className="dashboard_main_section">
        <div className="dashboard_records">
          <div className="dashboard_row">
            <div className="product_id">
              <h3>id</h3>
            </div>
            <div className="product_name">
              <h3>Name</h3>
            </div>
            <div className="product_price">
              <h3>Mobile</h3>
            </div>
            <div className="product_category">
              <h3>Email</h3>
            </div>
            <div className="product_operations">
              <h3>Button</h3>
            </div>
          </div>
          { memberData.length == 0 ? (
            <div className="dashboard_row">
              <div className="product_name">
                <h3 className="noProduct_found_heading">No Data Found</h3>
              </div>
            </div>
          ) : (
            memberData.map( ( ele, ind ) =>
            {
              return [
                <div className="dashboard_row" key={ ele._id }>
                  <div className="product_id">
                    <h3>{ ind + 1 }</h3>
                  </div>
                  <div className="product_name">
                    <h3>{ ele.fullName }</h3>
                  </div>
                  <div className="product_price">
                    <h3>{ ele.mobile }</h3>
                  </div>
                  <div className="product_category">
                    <h3>{ ele.email }</h3>
                  </div>
                  <div className="product_operations">
                    <Tooltip title="Update Product">
                      <NavLink
                        className="redirect_links"
                        to={ `/updateProduct/${ ele._id }` }
                      >
                        <EditIcon />
                      </NavLink>
                    </Tooltip>

                    <Tooltip title="Delete Product">
                      <NavLink
                        className="redirect_links"
                        onClick={ () => deletProduct( ele._id ) }
                      >
                        <DeleteIcon />
                      </NavLink>
                    </Tooltip>
                    <ToastContainer />
                  </div>
                </div>,
              ];
            } )
          ) }
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

