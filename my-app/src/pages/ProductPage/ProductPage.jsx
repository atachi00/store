import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {getProductsById} from '../../api/sellerPage'
import {useNavigate} from 'react-router-dom'
import './ProductPage.css'

function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProductsById(id)
        
        if (isMounted) {
          setProduct(data)
          console.log('Product loaded:', data)
        }
      } catch (error) {
        if (isMounted) {
          setError(error.response?.data?.message || error.message)
          console.log('Error:', error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  if (!product) return <div>Товар не найден</div>

  return (
  <div className="product-page">
    <div className="breadcrumbs">
      <div className="breadcrumb-item">
        <span
          className="breadcrumb-text"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          ← Назад к каталогу
        </span>
      </div>
    </div>

    <div className="product-main">
      <div className="product-gallery">
        {product.image_url ? (
          <img
            className="product-main-image"
            src={product.image_url}
            alt={product.name}
          />
        ) : (
          <div className="product-no-image">Нет изображения</div>
        )}
      </div>

      <div className="product-info">
        <div className="product-title-block">
          <p className="product-title">{product.name}</p>
          <div className="product-rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-icon">★</span>
              ))}
            </div>
            <span className="rating-value">4.5</span>
            <span className="reviews-count">128 отзывов</span>
          </div>
        </div>

        <div className="price-row">
          <span className="price-current">{product.price} ₽</span>
          <span className="price-old">32 990 ₽</span>
          <div className="discount-badge">
            <span className="discount-text">-24%</span>
          </div>
        </div>

        <div className="buy-row">
          <button className="buy-button">Купить</button>
        </div>

        <div className="description-block">
          <p className="description-title">Описание</p>
          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </div>
  </div>
)
}

export default ProductPage