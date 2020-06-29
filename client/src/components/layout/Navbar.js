import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import { useContext } from 'react';
const Navbar = () => {


    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, user, logout } = authContext
    const onLogout = () => {
        contactContext.contacts = []
        logout()
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-warning">
            <a class="navbar-brand" to="/"><i className="fas fa-id-card-alt mr-1"></i> Contact Keeper</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                {isAuthenticated === false && <div class="navbar-nav mx-left">
                    <Link class="nav-item nav-link active" to="/register">Register</Link>
                    <Link class="nav-item nav-link active" to="/login">Login</Link>
                    <Link class="nav-item nav-link active" to="/about">About</Link>
                </div>}
                {isAuthenticated === true && <div class="navbar-nav mx-right">
                    <a class="nav-item nav-link active">Hello {user && <span>{user.name}</span>}</a>
                    <a onClick={onLogout} class=" nav-link active">Logout</a>
                </div>}
            </div>
        </nav>
    )

}

export default Navbar
