import React, { Fragment } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute'
if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'))
}

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path='/' component={Home} />
                                    <Route exact path='/about' component={About} />
                                    <Route exact path='/register' component={Register} />
                                    <Route exact path='/login' component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    )
}

export default App
