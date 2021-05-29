// React
import React from "react";
import { connect } from "react-redux";
// Redux
import { onSearchValue, onSearchName } from "../../../Actions/ContactListActions";
class Search extends React.Component {
  //----Достаємо value з search і передажмо в state findContact
  searchValue = (event) => {
    const { onSearchValue } = this.props;
    let searchName = event.target.value;
    onSearchValue(searchName);
  };
  // --------Вибираємо що шукаємо------------------------
  selectSearch = (event) => {
    const { onSearchName } = this.props;
    let name = event.target.value;
    onSearchName(name);
  };
  // ----------------------------------------------------
  render() {
    return (
      <form className='form-inline my-2 my-lg-0'>
        <input
          onChange={this.searchValue}
          className='form-control mr-sm-2'
          type='text'
          placeholder='Search'
        />
        <div className='form-group mr-sm-2'>
          <select onChange={this.selectSearch} className='form-select p-2' id='exampleSelect1'>
            <option value='Name'>Name</option>
            <option value='Email'>Email</option>
            <option value='Phone'>Phone</option>
            <option value='Status'>Status</option>
          </select>
        </div>
      </form>
    );
  }
}
const mapStateToProps = ({ ContactListReducer }) => {
  const { findContact, nameSearch } = ContactListReducer;
  return { findContact, nameSearch };
};

const mapDispatchToProps = { onSearchValue, onSearchName };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
