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


export default (state, action) => {
    switch (action.type) {
        case GET_CONTACT:
            return {
                ...state,
                contacts: action.payload
            }

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id != action.payload)
            }
        case SET_CONTACT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CONTACT:
            return {
                ...state,
                current: null,
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filter: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex)
                }),

            }
        case CLEAR_FILTER: {
            return {
                ...state,
                filter: null
            }
        }
        case CONTACT_ERROR:
            {
                return {
                    ...state,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}