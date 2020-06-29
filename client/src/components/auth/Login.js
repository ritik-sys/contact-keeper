import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
const Login = (props) => {



    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext.isAuthenticated) {
            props.history.push('/');
        }

        if (authContext.error === 'invalid details') {
            authContext.error = null
            alertContext.setAlert('invalid details', 'danger')
        }
    }, [authContext.error, authContext.isAuthenticated, props.history])



    const [user, setuser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user;

    const onChange = (e) => {
        setuser({
            ...user, [e.target.name]: e.target.value,
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password == '') {
            alertContext.setAlert('please enter all fields', 'danger')
        } else {
            authContext.loginUser(user);
        }
    }


    return (
        <form onSubmit={onSubmit} className="container mt-5 w-75">
            <h1 className="text-center m-5">Login Form</h1>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" value={email} name='email' onChange={onChange} />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" value={password} name='password' onChange={onChange} />
                </div>
            </div>
            <button className="btn btn-dark btn-block">
                Login
            </button>
        </form>
    )
}

export default Login

