import React, { useContext } from 'react'
import ContextContent from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const contextContent = useContext(ContextContent)

    const { name, email, phone, type, id } = contact;

    const onClickDelete = (e) => {
        contextContent.deleteContact(id)
        contextContent.clearContact();
    }

    const onClickEdit = () => {
        contextContent.setContact(contact)
    }

    return (
        <div class="card border-warning mt-3" style={{
            maxWidth: "18rem"
        }}>
            <div class="card-header bg-warning text-center"><h5>{name}
                <span className={type === 'personal' ? ' badge badge-success ml-2 round' : 'badge badge-danger ml-2 round'}>
                    {type}
                </span></h5>

            </div>
            <div class="card-body text-dark">
                <h6 class="card-title"><i class="far fa-envelope"></i> : {email}</h6>
                <h6 class="card-title"><i class="fas fa-phone"></i> : {phone}</h6>
                <hr />
                <button className="btn btn-dark w-25 "><i class="fas fa-edit" onClick={onClickEdit}></i></button>
                <button className="btn btn-danger w-25 float-right" onClick={onClickDelete}><i class="far fa-trash-alt"></i></button>
            </div>
        </div>
    )
}

export default ContactItem
