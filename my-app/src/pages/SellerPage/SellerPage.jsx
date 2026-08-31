import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../shared/Card/Card'
import './SellerPage.css'
import Header from '../../shared/Header/Header'
import {getProducts, deleteProducts} from '../../api/sellerPage'

function SellerPage() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

useEffect(() => {
  let isMounted = true
  
  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProducts()
      
      if (isMounted) {
        setProducts(data)
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
}, [])
    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>
  return (
    <>
      <Header/> 
      <div>
        <div className="cards">
          {products.map((item) => (
            <div className="card-item" key={item.id}>
              <Card  product={item} />
              <button
                className="card-del-btn"
                onClick={() => {
                  deleteProducts(`/products/${item.id}`)
                    .then(() => setProducts(
                      products.filter(p => p.id !== item.id)))
                    .catch(() => console.log('ошибка'))
                }}
              >Delete</button> 
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SellerPage