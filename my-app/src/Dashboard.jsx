import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Dashboard.css'
import Card from './Card'
import Header from './Header'
import {getProducts,} from './api/sellerPage'
function Dashboard() {

const [products, setProducts] = useState([])
const navigate = useNavigate()

useEffect(()=> {
    if (!localStorage.getItem('token')) {
        navigate('/')
    }
})


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


return(
    <>
    <Header/>
    <div className='dash-cont'>
        {products.map(item => (
            <Card key={item.id} product={item}/>
        ))
        }
    </div>
    </>
)
}


export default Dashboard