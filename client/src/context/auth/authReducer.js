import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_USER,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR
} from '../types'

export default (state, action) => {

    switch (action.type) {

        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user
            }
        }
        case AUTH_ERROR: {
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                error: action.payload,
                loading: false,
                user: null
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            }
        }
        case LOGIN_FAIL: {
            localStorage.removeItem('token')
            return {
                error: action.payload,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        }
        case REGISTER_USER: {

            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
                token: action.payload.token
            }
        }
        case REGISTER_FAIL: {
            localStorage.removeItem('token')
            return {

                error: action.payload,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token')
            return {
                ...state,
                error: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,

            }
        }
        default:
            return state
    }

}