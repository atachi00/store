import './Card.css'
import { useNavigate } from 'react-router-dom'

function Card({ product }) {
  const navigate = useNavigate()
  const open = () => navigate(`/products/${product.id}`)

  return (
    <div
      className="card"
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.key === 'Enter' && open()}
    >
      <div className="card-media">
        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="card-img" />
        )}
      </div>
      <div className="card-body">
        <span className="card-title">{product.name}</span>
        <span className="card-price">{product.price} ₽</span>
        <span className="card-cta">Смотреть</span>
      </div>
    </div>
  )
}

export default Card
