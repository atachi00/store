import './Header.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()

    return(
        <div className="head-cont">
            <div className="logo-cont" onClick={() => navigate('/')}>
                <span className="logo-text">MarketPlace</span>
            </div>
            <div className="search-cont">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Поиск товаров..."
                />
            </div>
            <div className="main-btns">
                <button className="nav-btn" onClick={() => navigate('/create')}>Создать товар</button>
                <button className="nav-btn" onClick={() => navigate('/seller')}>Мои товары</button>
                <button className="logout-btn" onClick={() => navigate('/login')}>Выход</button>
            </div>
        </div>
    )

}