import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {getProductsById} from '../../api/sellerPage'
import './ProductPage.css'

function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          setError(error.message)
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
          <span className="breadcrumb-text">Редактировать карточку</span>
        </div>
      </div>

      <div className="product-main">
        <div className="product-gallery">
          <img className="product-main-image" src="https://res.cloudinary.com/kzvgsyu7/image/upload/v1787921254/Silly_cars.jpg" alt="SoundPro X900" />
          <div className="product-thumbs">
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-0" />
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-1" />
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-2" />
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-3" />
          </div>
        </div>

        <div className="product-info">
          <div className="product-title-block">
            <p className="product-title">{product.name}</p>
            <div className="product-rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <img key={product.id} className="star-icon" src="https://picsum.photos/id/18/18" alt="star" />
                ))}
              </div>
              <span className="rating-value">4.5</span>
              <span className="reviews-count">128 отзывов</span>
            </div>
          </div>

          <div className="price-row">
            <span className="price-current">{product.price}</span>
            <span className="price-old">32 990 ₽</span>
            <div className="discount-badge">
              <span className="discount-text">-24%</span>
            </div>
          </div>

          <p className="product-description">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage