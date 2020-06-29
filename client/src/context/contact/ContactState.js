import React, { useReducer } from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer'
import axios from 'axios'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CONTACT,
    CLEAR_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACT
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filter: null,
        error: null,
        loading: false
    }


    const [state, dispatch] = useReducer(contactReducer, initialState)

    const getContact = async () => {
        try {

            const res = await axios.get('api/contacts');
            console.log(res.data)
            dispatch({
                type: GET_CONTACT,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response
            })
        }
    }




    //Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
                'Access-Control-Allow-Credentials': true
            }
        }
        try {
            const res = await axios.post('api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data.contact })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data
            })
        }



    }

    //Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }

    //Set current contact
    const setContact = contact => {
        dispatch({ type: SET_CONTACT, payload: contact })
    }

    //clear current
    const clearContact = () => {
        dispatch({ type: CLEAR_CONTACT })
    }
    //update
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    //filter
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACT, payload: text })
    }

    //clear filter 
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filter: state.filter,
                error: state.error,
                addContact,
                deleteContact,
                setContact,
                clearContact,
                updateContact,
                filterContact,
                clearFilter,
                getContact
            }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;