// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import {
  getContacts,
  onDeleteContact,
  onEditContact,
  onAddContact,
} from "../../Actions/ContactListActions";
// Component
import ContactItem from "./ContactItem/ContactItem";
// Service
import { getAllContacts, updateContacts } from "../../Services/api-service";

class ContactList extends Component {
  //------При загрузці сторінки рендерим список контактів
  componentDidMount() {
    const { getContacts, renderList } = this.props;
    console.log(renderList);
    getAllContacts().then((data) => {
      if (data === null) {
        getContacts([]);
      } else {
        if (renderList) {
          getContacts(data);
        }
      }
    });
  }
  // ----------Видалення контакту-----------------------------
  onDelete = (Id) => {
    const { List, onDeleteContact } = this.props;
    const index = List.findIndex((elem) => elem.Id === Id);
    let partOne = List.slice(0, index);
    let partTwo = List.slice(index + 1);
    let tmpList = [...partOne, ...partTwo];
    onDeleteContact(tmpList);
    updateContacts(tmpList);
  };
  // -----------Зміна статусу----------------------------
  onRemoveStatus = (Id) => {
    const { List, onAddContact, StatusUser } = this.props;
    const index = List.findIndex((elem) => elem.Id === Id);
    let tmpList = List.slice();
    let indexStatus = StatusUser.findIndex((elem) => elem === tmpList[index].Status);
    StatusUser.length - 1 <= indexStatus ? (indexStatus = 0) : indexStatus++;
    tmpList[index].Status = StatusUser[indexStatus];
    onAddContact(tmpList);
    updateContacts(tmpList);
  };
  // ------------Копіювання контакту для редагування в state Reduce---------------------------
  onEdit = (Id) => {
    const { List, onEditContact } = this.props;
    const index = List.findIndex((elem) => elem.Id === Id);
    onEditContact(List[index]);
  };
  // --------------Пошук контакта в state по key----------------
  onShowContact = (items, searchValue) => {
    const { nameSearch } = this.props;
    if (searchValue.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item[nameSearch].toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    });
  };
  //----------------------------------------------------------
  render() {
    const { List, findContact } = this.props;
    const ContactList = this.onShowContact(List, findContact);
    return (
      <div className='container bootstrap snippets bootdeys bootdey'>
        <div className='row decor-default'>
          <div className='col-sm-12'>
            <div className='contacts-list'>
              <h5 className='title text-muted'>Contact List</h5>
              <div className='unit head '>
                <div className='field name text-secondary'>Name</div>
                <div className='field phone text-secondary'>Phone</div>
                <div className='field email icons text-secondary'>Email</div>
                <div className='field edit-contact text-secondary'>Edit</div>
              </div>
              {List.length !== 0 ? (
                ContactList.map((item) => {
                  return (
                    <ContactItem
                      key={item.Id}
                      {...item}
                      onDelete={() => this.onDelete(item.Id)}
                      onEdit={() => this.onEdit(item.Id)}
                      onRemoveStatus={() => this.onRemoveStatus(item.Id)}
                    />
                  );
                })
              ) : (
                <h2 className='text-center'>Contacts not found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ContactListReducer }) => {
  const { List, CurrentContact, StatusUser, findContact, nameSearch, renderList } =
    ContactListReducer;

  return { List, CurrentContact, StatusUser, findContact, nameSearch, renderList };
};
const mapDispatchToProps = {
  getContacts,
  onDeleteContact,
  onEditContact,
  onAddContact,
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ContactList));
