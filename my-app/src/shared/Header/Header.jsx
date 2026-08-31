import './Header.css'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
export default function Header() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : null
    const role = payload?.role
    const isSeller = role === 'seller'


    return(
        <div className="head-cont">
            <div className="logo-cont" onClick={() => navigate('/')}>
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
                {/* <button className="nav-btn" onClick={() => navigate('/create')}>Создать товар</button> */}
                {isSeller && (
                    <button className="nav-btn" onClick={() => navigate('/create')}>Создать товар</button>
                )}
                <button className="nav-btn" onClick={() => navigate('/seller')}>Мои товары</button>
                <button className="logout-btn" onClick={() => navigate('/')}>Выход</button>
            </div>
        </div>
    )

}