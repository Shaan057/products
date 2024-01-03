import './index.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductsItem from '../productsList'

const apiStatusConstants = {
    initial: 'inital',
    inProgress: 'inProgress',
    failure: 'failure',
    success: 'success'
}

const Products = () => {
    const [productsList, setProductsList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setApiStatus(apiStatusConstants.inProgress);
                const url = 'https://fakestoreapi.com/products'
                const response = await axios.get(url)
                const { data } = response
                setProductsList(data)
                setApiStatus(apiStatusConstants.success)
            } catch (error) {
                setApiStatus(apiStatusConstants.failure)
            }
        }
        fetchData()
    }, [])


    if (apiStatus === apiStatusConstants.inProgress) {
        return <div className='fullpage'><p>Loading...</p></div>
    }

    if (apiStatus === apiStatusConstants.failure) {
        return <div className='fullpage'><p>Error fetching data</p></div>
    }

    if (!productsList) {
        return null;
    }


    return (
        <div className='bg-container'>
            <nav className='nav-bar'>
                <Link to='/' className='details-link'>
                    <p className='products'>Products</p>
                </Link>
            </nav>
            <div className='bottom-container'>
                <ul className='products-list'>
                    {productsList.map((each) =>
                        <ProductsItem key={each.id} data={each} />
                    )}
                </ul>
            </div>
        </div>
    )
}


export default Products