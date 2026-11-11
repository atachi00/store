import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../shared/Header/Header'
import { getProductsById } from '../../api/sellerPage'
import './ProductPage.css'

function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProductsById(id)
        if (isMounted) setProduct(data)
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProduct()
    return () => { isMounted = false }
  }, [id])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(product.session_id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.log('Не удалось скопировать:', err)
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        {loading && <p className="state-msg">Загрузка...</p>}
        {!loading && error && <p className="state-msg error">Ошибка: {error}</p>}
        {!loading && !error && !product && <p className="state-msg">Товар не найден</p>}

        {!loading && !error && product && (
          <div className="product-page">
            <button className="back-link" onClick={() => navigate('/dashboard')}>
              ← Назад к каталогу
            </button>

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
                <h1 className="product-title">{product.name}</h1>

                <div className="price-row">
                  <span className="price-current">{product.price} ₽</span>
                </div>

                <div className="contact-block">
                  <p className="block-title">Связаться с продавцом (Session)</p>
                  <div className="contact-row">
                    <p className="contact-id">{product.session_id}</p>
                    <button className="btn btn-primary" onClick={handleCopy}>
                      {copied ? 'Скопировано ✓' : 'Копировать'}
                    </button>
                  </div>
                </div>

                <div className="description-block">
                  <p className="block-title">Описание</p>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default ProductPage
