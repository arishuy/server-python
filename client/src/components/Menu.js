import React from 'react'
import "../styles/Menu.css"

const Menu = () => {
    const token = localStorage.getItem("token");
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
      };
  return (
    <div className="menu">
        <nav className="navigation">
            <span>WEB IoT</span>
            <ul>
                <li><a href="/">
                <i className="fa-solid fa-house"></i>
                    Home</a></li>
                { token ?<div>
                    <li><a href="/profile"><i className="fa-solid fa-user"></i>Profile</a></li>
                    <li><a href="#" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>
                Logout</a></li>
                </div> 
                 :
                <div>
                    <li><a href="/login"><i className="fa-solid fa-key"></i>Login</a></li>
                    <li><a href="/register"><i className="fa-solid fa-registered"></i>Register</a></li>
                    </div>
                }
                <li><a href="/dashboard"><i className="fa-solid fa-layer-group"></i>Dashboard</a></li>
                <li><a href="/"><i className="fa-solid fa-gear"></i>Settings</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Menu