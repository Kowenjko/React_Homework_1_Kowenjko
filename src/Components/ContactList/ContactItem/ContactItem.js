import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ContactItem = (props) => {
  // console.log(props.onRemoveStatus);
  let status_class = "lab lab-none-status";

  const {
    Avatar,
    Gender,
    Name,
    Phone,
    Email,
    Status,
    onDelete,
    onRemoveStatus,
  } = props;
  const image = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`;

  switch (Status) {
    case "Friend":
      status_class = "lab lab-warning";
      break;
    case "Family":
      status_class = "lab lab-primary";
      break;
    case "Private":
      status_class = "lab lab-danger";
      break;
    case "Work":
      status_class = "lab lab-success";
      break;
    default:
      status_class = "lab lab-none-status";
      break;
  }

  return (
    <div className="unit">
      <div className="field name">
        <div className="check">
          <input id="cb2" name="cb1" type="checkbox" />
          <label htmlFor="cb2"></label>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
        <div className="d-flex">
          <img src={image} alt="image" className="avatar" />
          <div>
            <div> {Name}</div>
            <div className={status_class} onClick={onRemoveStatus}>
              {Status}
            </div>
          </div>
        </div>
      </div>
      <div className="field phone">{Phone}</div>
      <div className="field email">{Email}</div>
      <div className="field edit-contact">
        <FontAwesomeIcon
          className="text-success icon-edit"
          icon={faEdit}
          size="lg"
        />
        <FontAwesomeIcon
          className="text-danger icon-edit"
          onClick={onDelete}
          icon={faTrash}
          size="lg"
        />
      </div>
    </div>
  );
};
export default ContactItem;
