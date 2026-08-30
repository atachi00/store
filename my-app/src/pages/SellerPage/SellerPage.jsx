import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../shared/Card/Card'
import './SellerPage.css'
import Header from '../../shared/Header/Header'
import {getProducts, deleteProducts} from '../../api/sellerPage'

function SellerPage() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const interval = setInterval( async () => {
      try {
        const data = await getProducts()
        console.log(data)
        setProducts(data)
      } catch (error) {
        console.error('Ошибка ' , error)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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