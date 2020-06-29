import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer'

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    REGISTER_USER
} from '../types'
import axios from 'axios'
import setAuthToken from '../../setAuthToken';


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        error: null,
        user: null,

    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    //load User
    const loadUser = () => {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.token)
        }
        axios.get('/api/auth', {
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(res => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: AUTH_ERROR
                })


            })
    }

    //Register User
    const registerUser = async formData => {
        axios.post('/api/users', formData, {
            header: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                dispatch({
                    type: REGISTER_USER,
                    payload: res.data,
                })
                loadUser();

            })

            .catch(err => {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err.response.data
                })


            })

    }




    //Login User
    const loginUser = async formData => {

        axios.post('/api/auth', formData, {
            header: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                })
                loadUser();

            })

            .catch(err => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response.data
                })


            })

    }


    //Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }
    return (
        <authContext.Provider
            value={{
                token: state.token,
                temp: state.temp,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                registerUser,
                loadUser,
                loginUser,
                logout

            }}>
            {props.children}
        </authContext.Provider>
    )


}
export default AuthState