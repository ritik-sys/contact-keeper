import React, { useContext } from 'react'
import Contact from '../contact/Contacts'
import ContactForm from '../contact/ContactForm'
import ContactFilter from '../contact/ContactFilter'
import AuthContext from '../../context/auth/authContext'
import { useEffect } from 'react'
const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {

        authContext.loadUser();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="row">
            <div className="col-7">
                <ContactForm />
            </div>
            <div className="col-5">
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}

export default Home
