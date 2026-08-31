import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  const [error, setError] = useState('')
  const [text, setText] = useState({email: '', password: '', role: 'seller'})
  const navigate = useNavigate()

  return(
    <div className="reg-cont">
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
      <form>
        <label>
          <input 
            className="radio-role"
            onChange={(e) => {
              setText({...text, role: e.target.value})
            }}
            type="radio" 
            name="role" 
            value='seller'
            checked = {text.role === 'seller'}
          />Seller
        </label>
        <label>
          <input 
            className="radio-role"
            onChange={(e) => {
              setText({...text, role: e.target.value})
            }}
            type="radio" 
            name="role"
            value='buyer'
            checked = {text.role === 'buyer'}
          />Buyer            
        </label>
      </form>
      <button
        className="btn-reg"
        onClick={()=> {
          console.log(text)
          fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify(text)
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              navigate('/')
            } else {
              setError(data.message)
            }
          })
        }}
      >
        Register 
      </button>

      <Link to={"/"}>Already have an account? Log in</Link>
      {error && <h1 className="error-msg">{error}</h1>}
    </div>
  )
}

export default Register