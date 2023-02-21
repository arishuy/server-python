import React from 'react'

const LoginForm = () => {
    const token = localStorage.getItem('token')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const handleLogin = () => {
        fetch('/login', {
        headers: {
          'Content-Type': 'application/json'
        },  
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
        .then(res => res.json())
        .then(data =>
          localStorage.setItem('token', data.idToken)         
        )
        .then(() => {
          //reload the page
          window.location.reload()
        })
        .catch(err => console.log(err))
    }
    const handleLogout = () => {
      localStorage.removeItem('token')
      window.location.reload()
    }
    return (
      <div>
        {token ?<div><h1>Welcome!</h1> <button onClick={handleLogout}>Logout</button></div> : <div><input type="text" className='email' placeholder='Email'
        onChange={({ target: { value } }) =>
        {
          setEmail(value)
        }
        } />
        <input type="password" className='password' placeholder='Password'
        onChange={({ target: { value } }) =>
          setPassword(value)}/>           
        <button className='login' onClick={handleLogin}>Login</button></div>}
      
      </div>
    )
}

export default LoginForm