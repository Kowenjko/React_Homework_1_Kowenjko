import React, { Fragment, Component } from "react";

import ReactDOM from "react-dom";
import "./index.css";

//Component
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import About from "./Components/About/About";
import NotFound from "./Components/NotFound/NotFound";
import AddContact from "./Components/AddContact/AddContact";
import EditContact from "./Components/EditContact/EditContact";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
//API
import { updateContacts, getAllContacts } from "./Services/api-service";

class App extends Component {
  componentDidMount() {
    getAllContacts().then((data) => {
      if (data === null) {
        this.setState({ List: [] });
      } else {
        this.setState({
          List: data,
        });
      }
    });
  }
  state = {
    List: [],
    StatusUser: ["Friend", "Work", "Private", "Family", "None"],
    CurrentContact: null,
    findContact: "",
    nameSearch: "Name",
  };
  // --------------Зчитуємо з inputa value-------------------
  searchName = (event) => {
    let searchName = event.target.value;
    this.setState({
      findContact: searchName,
    });
  };
  // --------------Виборпошуку по типу-------------------------
  selectSearch = (event) => {
    let name = event.target.value;
    this.setState({
      nameSearch: name,
    });
  };
  // --------------Пошук контакта в state по key----------------
  onShowContact = (items, searchValue) => {
    const { nameSearch } = this.state;
    if (searchValue.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item[nameSearch].toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    });
  };
  // ----------Видалення контакту-----------------------------
  onDelete = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    let partOne = this.state.List.slice(0, index);
    let partTwo = this.state.List.slice(index + 1);
    let tmpList = [...partOne, ...partTwo];
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList);
  };
  // ------------Копіювання контакту для редагування---------------------------
  onEdit = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    this.setState({
      CurrentContact: this.state.List[index],
    });
  };
  // -----------Редагування контакту----------------------------
  onEditContact = (editContact) => {
    let tmpList = this.state.List.slice();
    const index = this.state.List.findIndex((elem) => elem.Id === editContact.Id);
    tmpList[index] = editContact;
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList);
  };
  // -----------Зміна статусу----------------------------
  onRemoveStatus = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    let tmpList = this.state.List.slice();

    let indexStatus = this.state.StatusUser.findIndex((elem) => elem === tmpList[index].Status);
    this.state.StatusUser.length - 1 <= indexStatus ? (indexStatus = 0) : indexStatus++;
    tmpList[index].Status = this.state.StatusUser[indexStatus];
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList);
  };
  // -----------Додавання контакту----------------------------
  onAddContact = (newContact) => {
    let tmpList = this.state.List.slice();
    tmpList.unshift(newContact);
    this.setState({
      List: tmpList,
    });
    updateContacts(tmpList);
  };

  // --------------Відрисовка-------------------------
  render() {
    const showContacts = this.onShowContact(this.state.List, this.state.findContact);
    const { CurrentContact } = this.state;
    console.log(this.state.nameSearch);
    return (
      <Fragment>
        <Router>
          <Header searchName={this.searchName} selectSearch={this.selectSearch} />
          <Switch>
            <Route
              path='/'
              exact
              render={() => (
                <ContactList
                  ContactList={showContacts}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  onRemoveStatus={this.onRemoveStatus}
                />
              )}
            />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route
              path='/add-contact'
              render={() => <AddContact onAddContact={this.onAddContact} />}
            />
            <Route
              path='/edit-contacts'
              render={() => (
                <EditContact Contact={CurrentContact} onEditContact={this.onEditContact} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
