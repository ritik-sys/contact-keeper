import React, { useContext, useRef } from 'react'
import ContactContext from '../../context/contact/contactContext'
const ContactFilter = () => {
    const text = useRef(null);
    const contactContext = useContext(ContactContext)
    const onChange = (e) => {
        e.preventDefault();
        if (e.target.value === '') {
            contactContext.clearFilter();
        }
        if (e.target.value !== '') {
            contactContext.filterContact(e.target.value);
        }


    }
    return (
        <form>
            <div class="input-group mt-5 mb-3">
                <input type="text" class="form-control" placeholder="Search Users..." onChange={onChange} />
            </div>
        </form>
    )
}

export default ContactFilter
