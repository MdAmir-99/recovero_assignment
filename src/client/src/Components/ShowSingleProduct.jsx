import React, {useState, useEffect} from 'react'
import './showSingleProduct.css';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import CategoryIcon from '@mui/icons-material/Category';
import PriceFormatter from "./PriceFormatter";

const ShowSingleProduct = () => {

    const [productData, setProductData] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    const isLogin = localStorage.getItem('admin');
        useEffect(() => {
            if(!isLogin){
                console.log("HHJDHSGDHJSGDHJSDGHJSDGHJSGDHSDGJHSDGHSJDGHDGHJSD8979")
                navigate('/login')
            }
        }, [])

        console.log(params.id)
    useEffect(() => {
        const getData = async () => {
            try{
                let url = `/products/${params.id}`;
                const response = await axios.get(url)
                if(response.status == 200){
                    setProductData(response.data.data)
                }
            }
            catch(err){
                console.log(err.response)
            }
        }
        getData();
    },[])
    



  return (
    <>
    <div className="product_container">
            <h2 id="product_heading">Product Details</h2>
        <div className="product_main_container">
            <div className="product_title">
                <h3>{productData.title}</h3>
            </div>
            <div className="image_container">
                <img src={productData.productImage}  alt={productData.category} />
            </div>
            <div className="price_category">
            <h3>{ <PriceFormatter price = {productData.price}/>}</h3>
            <h3><CategoryIcon /> {productData.category}</h3>
            </div>
            <div className="product_decription">
            <h3>{productData.description}</h3>
            </div>
            <NavLink to="" id="btn">Add To Cart</NavLink>
        </div>
    </div>
    <NavLink id="Back_link" to="/dashboard">Back</NavLink>
    </>
  )
}

export default ShowSingleProduct