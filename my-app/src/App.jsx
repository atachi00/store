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
import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* открытые */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* для любого авторизованного */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/products/:id"
        element={<ProtectedRoute><ProductPage /></ProtectedRoute>}
      />

      {/* только для продавца */}
      <Route
        path="/seller"
        element={<ProtectedRoute role="seller"><SellerPage /></ProtectedRoute>}
      />
      <Route
        path="/create"
        element={<ProtectedRoute role="seller"><CreateProduct /></ProtectedRoute>}
      />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
