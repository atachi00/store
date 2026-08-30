import { Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import SellerPage from './SellerPage'
import Register from './Register/Register'
import Dashboard from './Dashboard'
import ProductPage from './ProductPage'
import CreateProduct from './CreateProduct'


function App() {
  return (
    <Routes>
      <Route path="/seller" element={<SellerPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products/:id" element={<ProductPage/>}/>
      <Route path="/create" element={<CreateProduct/>}/>


    </Routes>
  )
}

export default App
