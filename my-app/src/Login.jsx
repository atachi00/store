
import  {useState}  from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import './Login.css'
function Login() {
const [text, setText] = useState({email: '', password: ''})
const [error, setError] = useState('')
const navigate = useNavigate()
return(
    
    <div className="login-cont">
        <input 
        className="inp-raw"     
        placeholder="Email"
        value={text.email}
        onInput={(e) => setText({...text, email: e.target.value})}
        />
        <input 
        className="inp-raw"
        onInput={(e) => setText({...text, password: e.target.value})}
        value={text.password}
        placeholder="Password"
        />
        <button
        className="btn-login"
        onClick={()=> {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // берем токен из ЛХ
                },                                                             // если нет - Null
                body: JSON.stringify(text)
                }
            )
            .then(res => res.json())
            .then(data => {
                if (data.success && data.role ==='seller') {               // если логин под селлером
                    console.log(data)                                       
                    localStorage.setItem('token', data.token)               // задаем новый токен
                    navigate('/seller')                                     //отправляем клиент на /seller
                } else if (data.success && data.role ==='buyer') {      //та же логика на страницу /buyer
                    localStorage.setItem('token', data.token)           //
                    navigate('/dashboard')                              //
                } else {
                    setError(data.message)   //выдаем ошибку из ответа (false, invalid...)
                }
            })
        }}
        >
           Login 
        </button>

        <Link className="redirect-link" to={"/register"}>Don't have an account? Register</Link>
        {error && <h1 className="error-msg">{error}</h1> }
    </div>
    
)
}


export default Login