import React, { useState, useEffect } from 'react'
import './addProduct.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";



const UpdateSingleProduct = () =>
{
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const [ productData, setProductData ] = useState( {
    title: "",
    description: "",
    price: ""
  } );

  const [ productImage, setProductImage ] = useState( [] );
  const [ error, setError ] = useState( "" )
  const [ select, setSelect ] = useState( "" );

  let name, value;

  const isLogin = localStorage.getItem( 'admin' );
  useEffect( () =>
  {
    if ( !isLogin )
    {
      // console.log("HHJDHSGDHJSGDHJSDGHJSDGHJSGDHSDGJHSDGHSJDGHDGHJSD8979")
      navigate( '/login' )
    }
  }, [] )

  // handle inputs 


  const handleInputs = ( e ) =>
  {
    // console.log(e);
    e.persist();
    name = e.target.name;
    value = e.target.value;

    setProductData( { ...productData, [ name ]: value } );
  };

  const handleSelect = ( e ) =>
  {
    e.preventDefault();
    setSelect( e.target.value );
  }

  const hanldeImage = ( e ) =>
  {
    console.warn( e.target.files[ 0 ] );
    setProductImage( { productImage: e.target.files[ 0 ] } );
  };

  // Send Data to FontEnd

  const UpdateData = async ( e ) =>
  {
    e.preventDefault();
    // console.warn(productData,select, productImage, "********************")

    const formData = new FormData();
    formData.append( "title", productData.title )
    formData.append( "description", productData.description )
    formData.append( "price", productData.price )
    formData.append( "category", select )
    formData.append( "productImage", productImage.productImage )

    const url = `http://localhost:5000/products/${ productId }`;
    // const url = `https://admin-dashboard-backend-production.up.railway.app/products/${ productId }`;
    const config = {
      method: "PUT",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // console.log(productImage.productImage, "^&^&^&^&^")

    try
    {
      const response = await axios( url, config );
      if ( response.status >= 400 )
      {
        setError( response.data.message );
        toast.error( response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        } );
        // console.log("Product Updatation failed");
      }
      else
      {
        toast.success( response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        } );
        // localStorage.setItem("admin" , JSON.stringify(response.data.data))
        setTimeout( () =>
        {
          navigate( "/dashboard" );
        }, 2500 );
      }
    } catch ( err )
    {
      toast.error( err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      } )
      // console.log(err.response.data.message);
      setError( err.response.data.message );
    }
  }






  return (
    <div className="addProduct_container">
      <div className="addProduct_header">
        <form
          method="POST"
          className="addProduct_form"
          encType="multipart/form-data">
          <h2 className="addProduct_form_heading">Update Product</h2>
          <div className="addProduct_formGroup">
            <TextField
              name="title"
              value={ productData.title }
              onChange={ handleInputs }
              label="Product Title"
              variant="standard"
              inputProps={ { style: { color: "orange" } } }
              className="addProduct_form_input"
            />
          </div>
          <div className="addProduct_formGroup">
            <TextField
              name="description"
              value={ productData.description }
              onChange={ handleInputs }
              label="Product Description"
              rows={ 4 }
              multiline
              defaultValue="Enter Product Description"
              variant="standard"
              className="addProduct_form_input"
            />
          </div>
          <div className="addProduct_formGroup">
            <TextField
              name="price"
              value={ productData.price }
              onChange={ handleInputs }
              label="Product Price"
              type="number"
              variant="standard"
              className="addProduct_form_input"
            />
          </div>
          <div className="addProduct_formGroup">
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              value={ select }
              onChange={ handleSelect }
              helperText="Please select Product Category"
              variant="standard"
              className="addProduct_form_input"
            >
              <MenuItem value={ "sports" }>Sports</MenuItem>
              <MenuItem value={ "style & fashion" }>Style & Fashion</MenuItem>
              <MenuItem value={ "health" }>Health</MenuItem>
              <MenuItem value={ "electronics" }>Electronics</MenuItem>
              <MenuItem value={ "shome appliences" }>Home Appliences</MenuItem>
              <MenuItem value={ "food" }>Food</MenuItem>
            </TextField>
          </div>
          <div className="addProduct_formGroup">
            <TextField
              name="productImage"
              value={ productImage.name }
              onChange={ hanldeImage }
              label="Product Image"
              type="file"
              variant="standard"
              className="addProduct_form_input"
            />
          </div>
          <div className="addProduct_formGroup">
            <Button
              variant="contained"
              type="submit"
              name="addProduct"
              onClick={ UpdateData }
              id="addProduct_btn"
            >
              Update Product
            </Button>
          </div>
          {/* {error && <span className="addProduct_error_message">{error}</span>} */ }
        </form>
      </div>
      <ToastContainer />
      <NavLink id="Back_link" to="/dashboard">Back</NavLink>
    </div>
  )
}

export default UpdateSingleProduct