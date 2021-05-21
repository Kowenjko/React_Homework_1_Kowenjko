import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const CartUser = ({ CartUser }) => {
  const { Name, Email, Phone, Status, Gender, Avatar } = CartUser;
  const imgAvatar = `https://randomuser.me/portraits/${Gender}/${Avatar}.jpg`;
  let status_class = "pro lab-none-status";

  switch (Status.toLowerCase()) {
    case "friend":
      status_class = "pro lab-warning";
      break;
    case "family":
      status_class = "pro lab-primary";
      break;
    case "private":
      status_class = "pro lab-danger";
      break;
    case "work":
      status_class = "pro lab-success";
      break;
    default:
      status_class = "pro lab-none-status";
      break;
  }

  return (
    <div className='card-container mb-2 d-flex flex-column justify-content-start align-items-center bg-secondary'>
      <span className={status_class}>{Status}</span>
      {Avatar && Gender ? (
        <img src={imgAvatar} alt='imgAvatar' className=' round' />
      ) : (
        <FontAwesomeIcon className='' icon={faImage} size='9x' />
      )}
      <div className='mt-4 text-left align-self-start ml-5'>
        <h5 className='text-primary font-weight-bold mb-3 text-left'>
          Name: <span className='text-light font-weight-normal'>{Name}</span>
        </h5>
        <p className='text-primary font-weight-bold m-2'>
          Email: <span className='text-light font-weight-normal ml-2'>{Email}</span>
        </p>
        <p className='text-primary font-weight-bold m-2'>
          Phone: <span className='text-light font-weight-normal'>{Phone}</span>
        </p>
        <p className='text-primary font-weight-bold m-2'>
          Gender: <span className='text-light font-weight-normal'>{Gender}</span>
        </p>
      </div>
    </div>
  );
};

export default CartUser;
