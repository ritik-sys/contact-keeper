import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';


const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })
    useEffect(() => {
        if (contactContext.current != null) {
            setContact(contactContext.current)
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, contactContext.current])
    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (contactContext.current === null) {
            contactContext.addContact(contact)
        }
        else {
            contactContext.updateContact(contact)
            contactContext.clearContact();

        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }
    const { name, email, phone, type } = contact
    return (
        <form onSubmit={onSubmit}>
            <h5 className="text-center mt-3">Contact Form</h5>
            <div class="form-group mt-2">
                <input type="text" className="form-control mt-2" id="formGroupExampleInput" placeholder="Name" value={name} name='name' onChange={onChange} />
                <input type="text" className="form-control mt-2" id="formGroupExampleInput" placeholder="Email" value={email} name='email' onChange={onChange} />
                <input type="text" className="form-control mt-2" id="formGroupExampleInput" placeholder="Phone" value={phone} name='phone' onChange={onChange} />
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name='type' id="inlineRadio1" value={type} onChange={onChange} />
                <label class="form-check-label mr-2" for="inlineRadio1">Personal</label>
                <input class="form-check-input" type="radio" name="type" id="inlineRadio2" value={type} onChange={onChange} />
                <label class="form-check-label" for="inlineRadio2">Professional</label>
            </div>
            <button className="btn btn-dark btn-block mt-3" onClick={onSubmit}>{contactContext.current === null ? 'Add Contact' : 'Update Contact'}</button>
            {contactContext.current && <div>
                <button className="btn btn-light btn-block" onClick={contactContext.clearContact}>Clear Contact</button>
            </div>}
        </form>
    )
}

export default ContactForm
