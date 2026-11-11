import { useEffect, useState } from 'react'
import Card from '../../shared/Card/Card'
import Header from '../../shared/Header/Header'
import { getMyProducts, deleteProduct } from '../../api/sellerPage'
import { getErrorMessage } from '../../utils/getErrorMessage'

function SellerPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        const data = await getMyProducts() // только товары этого продавца
        if (isMounted) setProducts(data)
      } catch (err) {
        if (isMounted) setError(getErrorMessage(err, 'Не удалось загрузить товары'))
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProducts()
    return () => { isMounted = false }
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить товар?')) return

    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert(getErrorMessage(err, 'Не удалось удалить товар'))
    }
  }

  return (
    <>
      <Header />
      <main className="page">
        <h1 className="page-title">Мои товары</h1>

        {loading && <p className="state-msg">Загрузка...</p>}
        {error && <p className="state-msg error">Ошибка: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="state-msg">У вас пока нет товаров</p>
        )}

        <div className="cards-grid">
          {products.map((item) => (
            <div className="card-item" key={item.id}>
              <Card product={item} />
              <button className="btn btn-danger btn-block" onClick={() => handleDelete(item.id)}>
                Удалить
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default SellerPage
