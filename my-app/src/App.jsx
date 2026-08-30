import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import SellerPage from './pages/SellerPage/SellerPage'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import ProductPage from './pages/ProductPage/ProductPage'
import CreateProduct from './pages/CreateProduct/CreateProduct'
import UnauthorizedPage from './pages/Unauthorized/UnauthorizedPage'
import ForbiddenPage from './pages/Forbidden/ForbiddenPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/seller" element={<SellerPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/create" element={<CreateProduct />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
