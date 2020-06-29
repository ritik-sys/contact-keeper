import React, { useContext, Fragment, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../../App.css'
const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const { contacts, getContact } = contactContext;
    useEffect(() => {
        getContact()
        //eslint-disable-next-line
    }, [])



    return (

        <Fragment>
            <TransitionGroup>
                {
                    contactContext.filter === null ?
                        contacts.map(contact =>
                            (<CSSTransition key={contact.id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>
                            )) :
                        contactContext.filter.map(contact =>
                            (<CSSTransition key={contact.id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>
                            ))
                }
            </TransitionGroup>
        </Fragment>

    )
}

export default Contacts
