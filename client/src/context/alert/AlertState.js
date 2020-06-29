import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer'
import { v4 as uuidv4 } from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => {

    const initialState = [];
    const [state, dispatch] = useReducer(alertReducer, initialState)
    const id = uuidv4();

    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })
        setTimeout(() => dispatch({
            type: REMOVE_ALERT,
            payload: id
        }), 5000)
    }


    return (
        <alertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}>
            {props.children}
        </alertContext.Provider>
    )




}
export default AlertState