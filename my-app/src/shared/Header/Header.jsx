import './Header.css'
import { useNavigate } from 'react-router-dom'
import { getRole, logout } from '../../utils/auth'

export default function Header() {
    const navigate = useNavigate()
    const isSeller = getRole() === 'seller'

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="head-cont">
            <div className="logo-cont" onClick={() => navigate('/dashboard')}>
                <span className="logo-text">LOGO</span>
            </div>
            <div className="search-cont">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Поиск товаров..."
                />
            </div>
            <div className="main-btns">
                {isSeller && (
                    <>
                        <button className="nav-btn" onClick={() => navigate('/create')}>Создать товар</button>
                        <button className="nav-btn" onClick={() => navigate('/seller')}>Мои товары</button>
                    </>
                )}
                <button className="logout-btn" onClick={handleLogout}>Выход</button>
            </div>
        </div>
    )
}
