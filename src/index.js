import React, { Fragment, Component } from "react";

// import { v4 as uuidv4 } from "uuid";
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
      // console.log("data=", data);
      if (data === null) {
        this.setState({ List: [] });
      } else {
        this.setState({
          List: data,
        });
      }
    });
  }
  // componentDidMount() {
  //   console.log("componentDidMount");
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate");
  //   console.log("nextProps", nextProps);
  //   console.log("nextState", nextState);
  //   // if (nextState.List.length === 2) {
  //   //   return false;
  //   // }
  //   return true;
  // }
  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  // }

  // componentWillUnmount() {
  //   console.log("componentWillUnmount");
  //   getAllContacts();
  // }

  state = {
    List: [],
    StatusUser: ["Friend", "Work", "Private", "Family", "None"],
    CurrentContact: null,
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
    // console.log(index);
    this.setState({
      CurrentContact: this.state.List[index],
    });
  };
  // -----------Редагування контакту----------------------------
  onEditContact = (editContact) => {
    let tmpList = this.state.List.slice();
    const index = this.state.List.findIndex(
      (elem) => elem.Id === editContact.Id
    );
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

    let indexStatus = this.state.StatusUser.findIndex(
      (elem) => elem === tmpList[index].Status
    );
    this.state.StatusUser.length - 1 <= indexStatus
      ? (indexStatus = 0)
      : indexStatus++;
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
    const { List, CurrentContact } = this.state;
    return (
      <Fragment>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <ContactList
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  onRemoveStatus={this.onRemoveStatus}
                  ContactList={List}
                />
              )}
            />
            <Route path="/contact" exact component={Contact} />
            <Route path="/about" exact component={About} />
            <Route
              path="/add-contact"
              exact
              render={() => <AddContact onAddContact={this.onAddContact} />}
            />
            <Route
              path="/edit-contacts"
              exact
              render={() => (
                <EditContact
                  Contact={CurrentContact}
                  onEditContact={this.onEditContact}
                />
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
