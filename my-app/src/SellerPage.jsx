import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from './Card'
import './SellerPage.css'
import Header from './Header'
import {getProducts, deleteProducts} from './api/sellerPage'


function SellerPage() {
const [products, setProducts] = useState([])
const [text, setText] = useState({name: '', price: '', description: ''})
const navigate = useNavigate()
const handleClick = () => {
  navigate('/create')
}

useEffect(() => {                        // проверка наличия токена
  if (!localStorage.getItem('token')) {  //если нет токена - редирект на /login
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
          .catch(() => console.log('ошибка')
        )}}
        >Delete</button> 
      </div>
    ))}
  </div>
  <div className="card-form">
      <input
      className="card-inp"
    value={text.name}
    placeholder="Product name"
    onInput={(e) => setText({...text, name: e.target.value})}
    />
      {/* <input
      placeholder="Price"
      className="card-inp"
    value={text.price}
    onInput={(e) => setText({...text, price: e.target.value})}
    />
      <input
      placeholder="Description"
      className="card-inp"
    value={text.description}
    onInput={(e) => setText({...text, description: e.target.value})}
    /> */}
      <button
      className="card-btn"
    onClick={() => handleClick()}
    >Add</button>
    </div>
    </div>
  </>
)

}

export default SellerPage
