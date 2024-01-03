import './index.css'
import { Link } from 'react-router-dom'

const ProductsItem = ({ data }) => {
    const { id, title, image } = data
    return (
        <li className='list-item'>
            <Link to={`/${id}`} className='link'>
                <img className='image' src={image} alt={title} />
                <p className='title'>{title}</p>
            </Link>
        </li>
    )
}

export default ProductsItem