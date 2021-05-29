// React
import React from "react";
import { Link } from "react-router-dom";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ContactItem = (props) => {
  let status_class = "lab lab-none-status";

  const { Avatar, Gender, Name, Phone, Email, Status, onDelete, onRemoveStatus, onEdit } = props;

  const imgAvatar = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`;

  switch (Status.toLowerCase()) {
    case "friend":
      status_class = "lab lab-warning";
      break;
    case "family":
      status_class = "lab lab-primary";
      break;
    case "private":
      status_class = "lab lab-danger";
      break;
    case "work":
      status_class = "lab lab-success";
      break;
    default:
      status_class = "lab lab-none-status";
      break;
  }
  return (
    <div className='unit'>
      <div className='field name'>
        <div className='check'>
          <input id='cb2' name='cb1' type='checkbox' />
          <label htmlFor='cb2'></label>
          <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'></svg>
        </div>
        <div className='d-flex'>
          {Avatar && Gender ? (
            <img src={imgAvatar} alt='imgAvatar' className=' avatar' />
          ) : (
            <FontAwesomeIcon className='avatar' icon={faImage} size='9x' />
          )}
          <div>
            <div> {Name}</div>
            <div className={status_class} onClick={onRemoveStatus}>
              {Status}
            </div>
          </div>
        </div>
      </div>
      <div className='field phone'>{Phone}</div>
      <div className='field email'>{Email}</div>
      <div className='field edit-contact'>
        <Link to='/edit-contacts'>
          <FontAwesomeIcon
            className='text-success icon-edit'
            onClick={onEdit}
            icon={faEdit}
            size='lg'
          />
        </Link>
        <FontAwesomeIcon
          className='text-danger icon-edit'
          onClick={onDelete}
          icon={faTrash}
          size='lg'
        />
      </div>
    </div>
  );
};
export default ContactItem;
