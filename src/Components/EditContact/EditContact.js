// React
import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { onAddContact } from "../../Actions/ContactListActions";
//Service
import { updateContacts } from "../../Services/api-service";

//Component
import CartUserEdit from "../CartUser/CartUserEdit";

export class EditContact extends Component {
  state = {
    id: 0,
    Avatar: "",
    Gender: "",
    Name: "",
    Phone: "",
    Email: "",
    Status: "",
    IsRedirect: false,
  };

  // ----------Функція для всіх value--------------------
  getContact = (e) => {
    const name = e.target.value;
    const nameContact = e.target.name;
    this.setState({ [nameContact]: name });
  };
  // -----------------------------------
  SendForm = (e) => {
    e.preventDefault();
    const { Avatar, Gender, Name, Phone, Email, Status } = this.state;
    const { CurrentContact, onAddContact } = this.props;
    const editContact = {
      Id: CurrentContact.Id,
      Avatar: parseInt(Avatar) ? parseInt(Avatar) : CurrentContact.Avatar,
      Gender: Gender ? Gender : CurrentContact.Gender,
      Name: Name ? Name : CurrentContact.Name,
      Phone: Phone ? Phone : CurrentContact.Phone,
      Email: Email ? Email : CurrentContact.Email,
      Status: Status ? Status : CurrentContact.Status,
    };

    const { List } = this.props;
    let tmpList = List.slice();
    const index = List.findIndex((elem) => elem.Id === editContact.Id);
    tmpList[index] = editContact;
    onAddContact(tmpList);
    updateContacts(tmpList);
    this.setState({ IsRedirect: true });
  };
  // -----------------------------------
  render() {
    const { IsRedirect, Avatar, Name, Email, Phone, Status } = this.state;
    const { CurrentContact } = this.props;
    if (IsRedirect || this.props.CurrentContact === null) {
      return <Redirect to='/' />;
    }

    return (
      <Fragment>
        <div className='container'>
          <h2 className='text-center mt-4'>
            Edit contact -{" "}
            <span className='text-primary'>
              {
                CurrentContact.Name
                //   this.state.Name ? this.state.Name : Contact.Name // Виводимо якщо потрібно змінювати назву в h2
              }
            </span>
          </h2>
          <div className='row'>
            <form className='col-6 mb-3 card-container bg-secondary' onSubmit={this.SendForm}>
              <div className='form-group'>
                <fieldset disabled=''>
                  <label className='form-label'>Name</label>
                  <input
                    className='form-control'
                    type='text'
                    name='Name'
                    value={Name ? Name : CurrentContact.Name}
                    onChange={this.getContact}
                    required
                  />
                </fieldset>
              </div>

              <div className='form-group'>
                <fieldset>
                  <label className='form-label'>Email</label>
                  <input
                    className='form-control'
                    type='email'
                    name='Email'
                    onChange={this.getContact}
                    value={Email ? Email : CurrentContact.Email}
                    // placeholder={Contact.Email}
                    required
                  />
                </fieldset>
              </div>

              <div className='form-group has-success'>
                <label className='form-label'>Phone</label>
                <input
                  type='tel'
                  // placeholder={Contact.Phone}
                  value={Phone ? Phone : CurrentContact.Phone}
                  name='Phone'
                  onChange={this.getContact}
                  className='form-control'
                  required
                />
              </div>

              <div className='row'>
                <div className='form-group col-6'>
                  <label className='form-label'>Status</label>
                  <select
                    className=' custom-select'
                    id='exampleSelect1'
                    name='Status'
                    value={Status ? Status : CurrentContact.Status}
                    onChange={this.getContact}
                    required
                  >
                    <option value='Friend'>Friend</option>
                    <option value='Work'> Work</option>
                    <option value='Private'>Private</option>
                    <option value='Family'>Family</option>
                    <option value='None'>None</option>
                  </select>
                </div>
                <fieldset className='form-group col-6'>
                  <label className='form-label  '>
                    Gender- <strong className='text-warning'>Necessarily</strong>{" "}
                  </label>
                  <div className='d-flex'>
                    <div className='custom-control custom-radio mt-2'>
                      <input
                        type='radio'
                        id='customRadio1'
                        name='Gender'
                        onChange={this.getContact}
                        className='custom-control-input'
                        value='men'
                      />
                      <label className='custom-control-label' htmlFor='customRadio1'>
                        men
                      </label>
                    </div>
                    <div className='custom-control custom-radio mt-2 ml-4'>
                      <input
                        type='radio'
                        id='customRadio2'
                        name='Gender'
                        onChange={this.getContact}
                        className='custom-control-input'
                        value='women'
                      />
                      <label className='custom-control-label' htmlFor='customRadio2'>
                        women
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <fieldset className='form-group'>
                {/* <label className="form-label" >Avatar</label>
                                <input type="number" min="0" max="99" name="Avatar" className="form-control" onChange={this.getContact} placeholder='Avatar' /> */}

                <label htmlFor='customRange1'>
                  Avatar - {Avatar ? Avatar : CurrentContact.Avatar}
                </label>
                <input
                  type='range'
                  max='99'
                  className='custom-range'
                  name='Avatar'
                  value={Avatar ? Avatar : CurrentContact.Avatar}
                  id='customRange1'
                  onChange={this.getContact}
                />
              </fieldset>

              <button type='submit' className='btn  bg-primary w-100 mb-2'>
                Save
              </button>
            </form>
            <div className='col-6 mb-3'>
              <CartUserEdit CartUser={this.state} CartProps={this.props.CurrentContact} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ ContactListReducer }) => {
  const { CurrentContact, List } = ContactListReducer;
  return { CurrentContact, List };
};

const mapDispatchToProps = { onAddContact };
export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
