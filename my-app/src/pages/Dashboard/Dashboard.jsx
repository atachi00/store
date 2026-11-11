import { useEffect, useState } from 'react'
import Card from '../../shared/Card/Card'
import Header from '../../shared/Header/Header'
import { getProducts } from '../../api/sellerPage'
import { getErrorMessage } from '../../utils/getErrorMessage'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        const data = await getProducts()
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

  return (
    <>
      <Header />
      <main className="page">
        <h1 className="page-title">Каталог</h1>

        {loading && <p className="state-msg">Загрузка...</p>}
        {error && <p className="state-msg error">Ошибка: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="state-msg">Товаров пока нет</p>
        )}

        <div className="cards-grid">
          {products.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
      </main>
    </>
  )
}

export default Dashboard
