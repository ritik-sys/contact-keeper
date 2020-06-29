import React, { useState, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import { useContext } from 'react'
import Alert from '../layout/Alert'
import AuthContext from '../../context/auth/authContext'





const Register = (props) => {




    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = user;
    useEffect(() => {

        if (authContext.isAuthenticated) {
            props.history.push('/');
        }



        if (authContext.error === 'user already exist') {
            authContext.error = null
            alertContext.setAlert('Already Registered', 'danger')
        }
    }, [authContext.error, authContext.isAuthenticated])
    const onSubmit = (e) => {
        e.preventDefault();
        if (name == '' || email === '' || password == '') {
            alertContext.setAlert('please enter all fields', 'danger')
        } else if (password != password2) {
            alertContext.setAlert('Passwords Do not Match', 'danger')
        } else {

            authContext.registerUser({
                name,
                email,
                password
            });
        }
    }
    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div className='form-container'>

            <h1 className='text-center m-3'>Registration Form</h1>
            <Alert />
            <form onSubmit={onSubmit}>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name='name' value={name} onChange={onChange} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" readonly class="form-control" name='email' value={email} onChange={onChange} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" name='password' value={password} onChange={onChange} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Confirm Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" name='password2' value={password2} onChange={onChange} />
                    </div>
                </div>
                <button className="btn btn-dark btn-block" >Register</button>
            </form>
        </div>

    )
}

export default Register
