// React
import React, { Component, Fragment } from "react";
// Id random
import { v4 as uuidv4 } from "uuid";
//Redax
import { connect } from "react-redux";
//Router
import { Redirect } from "react-router-dom";
//Component
import CartUser from "../CartUser/CartUser";
//Service
import { updateContacts } from "../../Services/api-service";
//Action
import { onAddContact } from "../../Actions/ContactListActions";
export class AddContact extends Component {
  state = {
    Avatar: "",
    Gender: "",
    Name: "",
    Phone: "",
    Email: "",
    Status: "None",
  };

  // ----------Функція для всіх value-------------------------
  getContact = (e) => {
    const name = e.target.value;
    const nameContact = e.target.name;
    this.setState({ [nameContact]: name });
  };
  // -----------------------------------
  SendForm = (e) => {
    e.preventDefault();
    const { Avatar, Gender, Name, Phone, Email, Status } = this.state;
    const { onAddContact, List } = this.props;
    const newContact = {
      Id: uuidv4(),
      Avatar: parseInt(Avatar),
      Gender: Gender,
      Name: Name,
      Phone: Phone,
      Email: Email,
      Status: Status,
      IsRedirect: false,
    };
    let tmpList = List.slice();
    tmpList.unshift(newContact);
    // console.log("tmpList", tmpList);
    onAddContact(tmpList);
    updateContacts(tmpList);
    this.setState({ IsRedirect: true });
  };
  // -----------------------------------
  render() {
    console.log("props", this.props);
    const { Avatar, IsRedirect } = this.state;
    if (IsRedirect) {
      return <Redirect to='/' />;
    }
    return (
      <Fragment>
        <div className='container'>
          <h2 className='text-center mt-4'>Add new contact</h2>
          <div className='row'>
            <form className='col-6 mb-3 card-container bg-secondary' onSubmit={this.SendForm}>
              <div className='form-group'>
                <fieldset disabled=''>
                  <label className='form-label'>Name</label>
                  <input
                    className='form-control'
                    type='text'
                    name='Name'
                    onChange={this.getContact}
                    placeholder='Name'
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
                    placeholder='Email'
                    required
                  />
                </fieldset>
              </div>
              <div className='form-group has-success'>
                <label className='form-label'>Phone</label>
                <input
                  type='tel'
                  placeholder='Phone'
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
                    onChange={this.getContact}
                    required
                  >
                    <option selected disabled>
                      Select...
                    </option>
                    <option value='Friend'>Friend</option>
                    <option value='Work'> Work</option>
                    <option value='Private'>Private</option>
                    <option value='Family'>Family</option>
                    <option value='None'>None</option>
                  </select>
                </div>
                <fieldset className='form-group col-6'>
                  <label className='form-label  '>Gender</label>
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

                <label htmlFor='customRange1'>Avatar - {Avatar}</label>
                <input
                  type='range'
                  max='99'
                  className='custom-range'
                  name='Avatar'
                  id='customRange1'
                  onChange={this.getContact}
                />
              </fieldset>
              <button type='submit' className='btn  bg-primary w-100 mb-2'>
                Save
              </button>
            </form>
            <div className='col-6 mb-3'>
              <CartUser CartUser={this.state} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ ContactListReducer }) => {
  const { List, IsRedirect } = ContactListReducer;

  console.log("ContactListReducer=", ContactListReducer);
  return { List, IsRedirect };
};

const mapDispatchToProps = { onAddContact };

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
