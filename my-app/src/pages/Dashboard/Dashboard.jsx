import { useEffect, useState } from 'react'
import './Dashboard.css'
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
      {loading && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error}</div>}
      {!loading && !error && products.length === 0 && <div>Товаров пока нет</div>}
      <div className="dash-cont">
        {products.map((item) => (
          <Card key={item.id} product={item} />
        ))}
      </div>
    </>
  )
}

export default Dashboard
