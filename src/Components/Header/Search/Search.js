import React from "react";

class Search extends React.Component {
  render() {
    const { searchName, selectSearch } = this.props;
    return (
      <form className='form-inline my-2 my-lg-0'>
        <input
          onChange={searchName}
          className='form-control mr-sm-2'
          type='text'
          placeholder='Search'
        />
        <div className='form-group mr-sm-2'>
          <select onChange={selectSearch} className='form-select p-2' id='exampleSelect1'>
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

export default Search;
