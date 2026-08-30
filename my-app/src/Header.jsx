import './Header.css'

export default function Header() {

    return(
        <div className="head-cont">
            <div className="logo-cont"> logo</div>
            <div className="search-cont">search</div>
            <div className="main-btns">btns</div>
            <div className="oauth">
                <button className="auth-btn">
                    Login
                </button>
            </div>
        </div>
    )

}