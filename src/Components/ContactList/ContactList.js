import React from "react";

//ContactItem

import ContactItem from "./ContactItem/ContactItem";
const ContactList = ({ ContactList, onDelete, onRemoveStatus, onEdit }) => {
  const item = ContactList.map((contact) => {
    return (
      <ContactItem
        key={contact.Id}
        {...contact}
        onDelete={() => onDelete(contact.Id)}
        onEdit={() => onEdit(contact.Id)}
        onRemoveStatus={() => onRemoveStatus(contact.Id)}
      />
    );
  });
  return (
    <div className="container bootstrap snippets bootdeys bootdey">
      <div className="row decor-default">
        <div className="col-sm-12">
          <div className="contacts-list">
            <h5 className="title text-muted">Contact List</h5>
            <div className="unit head ">
              <div className="field name text-secondary">Name</div>
              <div className="field phone text-secondary">Phone</div>
              <div className="field email icons text-secondary">
                Email
                {/* <i className="fas fa-user-edit"></i> */}
              </div>
              <div className="field edit-contact text-secondary">Edit</div>
            </div>
            {ContactList.length > 0 ? (
              item
            ) : (
              <h2 className="empty-list">Contact list is not</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactList;
