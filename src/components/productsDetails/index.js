// ProductsDetails.js
import './index.css'

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";


const apiStatusConstants = {
    initial: 'initial',
    inProgress: 'inProgress',
    failure: 'failure',
    success: 'success',
};

const ProductsDetails = () => {
    const [productDetails, setProductDetails] = useState(null);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://fakestoreapi.com/products/${id}`;
                setApiStatus(apiStatusConstants.inProgress);
                const response = await axios.get(url);
                const { data } = response;
                setProductDetails(data);
                setApiStatus(apiStatusConstants.success);
            } catch (error) {
                setApiStatus(apiStatusConstants.failure);
            }
        };
        fetchData();
    }, [id]);

    if (apiStatus === apiStatusConstants.inProgress) {
        return <div className='fullpage'><p>Loading...</p></div>
    }

    if (apiStatus === apiStatusConstants.failure) {
        return <div className='fullpage'><p>Error fetching data</p></div>
    }

    if (!productDetails) {
        return null;
    }

    const { title, price, description, category, image, rating } = productDetails;
    const { rate } = rating;

    return (
        <div className='details-bg-container'>
            <nav className='nav-bar'>
                <Link to='/' className='details-link'>
                    <p className='products'>Products</p>
                </Link>
            </nav>
            <div className='bottom-products'>
                <img className='details-image' src={image} alt={title} />
                <div className='right-container'>
                    <p className='details-title'>{title}</p>
                    <p className='description'>{description}</p>
                    <div className='price-rating '>
                        <p className='price'>{price} Rs /-</p>
                        <p className='rating'><FaStar className='star' /> {rate}</p>
                    </div>
                    <div className='price-rating '>
                        <button className='button add-to-cart-button' type='button'>Add to Cart</button>
                        <button className='button buy-button' type='button'>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;
