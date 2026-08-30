
import './Card.css'
import {useNavigate} from 'react-router-dom'
function Card({product}) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/products/${product.id}`)
    }
return(
    <div className="card" onClick={handleClick} style={{cursor: 'pointer'}}>
        <div className="img"></div>
            <div className="card-info">
            <span className="title">{product.name}</span>
            <span className="price">{product.price}$</span>
            <span className="button">{product.description}</span>
        </div>
    </div>
)
}


export default Card