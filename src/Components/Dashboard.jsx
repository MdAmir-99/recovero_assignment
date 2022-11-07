import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./dashboard.css";
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
import PriceFormatter from "./PriceFormatter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [inActiveProduct, setInActiveProduct] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const isLogin = localStorage.getItem("admin");
    if (isLogin == null) {
      navigate("/login");
    } else {
      getData();
      getAdmin();
    }
  }, []);

  let firstName, lastName, email, mobile, profileImage;

  const getData = async () => {
    try {
      const url = "https://admin-dashboard-backend-production.up.railway.app/products";
      const response = await axios.get(url);
      if (response.status == 200) {
        setProductData(response.data.data);
        setInActiveProduct(response.data.inActiveProduct);
      }
    } catch (err) {
      // console.log(err.response);
    }
  };

  const getAdmin = async () => {
    try {
      const url = "https://admin-dashboard-backend-production.up.railway.app/admins";
      const response = await axios.get(url);
      if (response.status == 200) {
        setTotalAdmin(response.data.data);
      }
    } catch (err) {
      // console.log(err.response);
    }
  };

  let adminData = localStorage.getItem("admin");
  if (adminData) {
    let parseData = JSON.parse(adminData);
    firstName = parseData.firstName;
    lastName = parseData.lastName;
    email = parseData.email;
    mobile = parseData.mobile;
    profileImage = parseData.profileImage;
  }

  const deletProduct = async (id) => {
    const url = `https://admin-dashboard-backend-production.up.railway.app/products/${id}`;
    // console.log(url, "URLLLLL");
    const response = await axios.delete(url);
    getData();
    toast.success(response.data.message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="dashboard_container">
      <aside className="dashboard_left_section">
        <div className="admin_profile">
          <h3 className="profile_heading">ADMIN PROFILE</h3>
          <div className="admin_data">
            <Avatar
              alt="Remy Sharp"
              src={profileImage}
              sx={{ width: 100, height: 100 }}
            />
            <h3>{`${firstName} ${lastName}`}</h3>
            <h3>{email}</h3>
            <h3>{mobile}</h3>
            <Tooltip title="Add Product">
              <NavLink to="/addProduct">
                <AddCircleIcon className="icon" fontSize="large" />
              </NavLink>
            </Tooltip>
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
        <div className="dashboard_cards">
          <div className="card">
            <div className="card_icon">
              <ProductionQuantityLimitsIcon
                className="card_social_icon"
                fontSize="large"
              />
            </div>
            <div className="card_container">
              <h3>Total Active Products</h3>
              <h2>{productData.length}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card_icon">
              <ProductionQuantityLimitsIcon
                className="card_social_icon"
                fontSize="large"
              />
            </div>
            <div className="card_container">
              <h3>Total Deleted Products</h3>
              <h2>{inActiveProduct}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card_icon">
              <SupervisorAccountIcon
                className="card_social_icon"
                fontSize="large"
              />
            </div>
            <div className="card_container">
              <h3>Total Admins</h3>
              <h2>{totalAdmin}</h2>
            </div>
          </div>
        </div>
        <div className="dashboard_records">
          <div className="dashboard_row">
            <div className="product_id">
              <h3>id</h3>
            </div>
            <div className="product_name">
              <h3>Name</h3>
            </div>
            <div className="product_price">
              <h3>Price</h3>
            </div>
            <div className="product_category">
              <h3>Category</h3>
            </div>
            <div className="product_details">
              <h3>Details</h3>
            </div>
            <div className="product_operations">
              <h3>Button</h3>
            </div>
          </div>
          {productData.length == 0 ? (
            <div className="dashboard_row">
              <div className="product_name">
                <h3 className="noProduct_found_heading">No Product Found</h3>
              </div>
            </div>
          ) : (
            productData.map((ele, ind) => {
              return [
                <div className="dashboard_row" key={ele._id}>
                  <div className="product_id">
                    <h3>{ind + 1}</h3>
                  </div>
                  <div className="product_name">
                    <h3>{ele.title}</h3>
                  </div>
                  <div className="product_price">
                    <h3>{<PriceFormatter price={ele.price} />}</h3>
                  </div>
                  <div className="product_category">
                    <h3>{ele.category}</h3>
                  </div>
                  <div className="product_details">
                    <NavLink id="get_details_link" to={`/product/${ele._id}`}>
                      Get Details
                    </NavLink>
                  </div>
                  <div className="product_operations">
                    <Tooltip title="Update Product">
                      <NavLink
                        className="redirect_links"
                        to={`/updateProduct/${ele._id}`}
                      >
                        <EditIcon />
                      </NavLink>
                    </Tooltip>

                    <Tooltip title="Delete Product">
                      <NavLink
                        className="redirect_links"
                        onClick={() => deletProduct(ele._id)}
                      >
                        <DeleteIcon />
                      </NavLink>
                    </Tooltip>
                    <ToastContainer />
                  </div>
                </div>,
              ];
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
