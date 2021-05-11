import React, { Fragment, Component } from "react";

import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom";
import "./index.css";

//Component
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";

class App extends Component {
  state = {
    List: [
      {
        Id: uuidv4(),
        Avatar: "67",
        Gender: "men",
        Name: " Alexander Verdnam",
        Phone: "+1-800-600-9898",
        Email: "example@gmail.com",
        Status: "Friend",
      },
      {
        Id: uuidv4(),
        Avatar: "5",
        Gender: "men",
        Name: "Gerard Butler",
        Phone: "+1-800-600-4589",
        Email: "example@gmail.com",
        Status: "Work",
      },
      {
        Id: uuidv4(),
        Avatar: "79",
        Gender: "women",
        Name: "Anna Lee",
        Phone: "+1-800-600-3658",
        Email: "example@gmail.com",
        Status: "Private",
      },
      {
        Id: uuidv4(),
        Avatar: "6",
        Gender: "women",
        Name: "Olga Verdnam",
        Phone: "+1-800-600-3658",
        Email: "example@gmail.com",
        Status: "Family",
      },
      {
        Id: uuidv4(),
        Avatar: "77",
        Gender: "men",
        Name: "John Verdnam",
        Phone: "+1-800-600-2135",
        Email: "example@gmail.com",
        Status: "none",
      },
    ],
    StatusUser: ["Friend", "Work", "Private", "Family", "none"],
  };
  // ---------------------------------------
  onDelete = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    let partOne = this.state.List.slice(0, index);
    let partTwo = this.state.List.slice(index + 1);
    let tmpList = [...partOne, ...partTwo];
    this.setState(() => {
      return {
        List: tmpList,
      };
    });
   };
  // ---------------------------------------
  onRemoveStatus = (Id) => {
    const index = this.state.List.findIndex((elem) => elem.Id === Id);
    let tmpList = this.state.List.map((item) => item);
    let indexStatus = this.state.StatusUser.findIndex((elem) => elem === tmpList[index].Status);
    this.state.StatusUser.length - 1 <= indexStatus ? (indexStatus = 0): indexStatus++;
    tmpList[index].Status = this.state.StatusUser[indexStatus];
    this.setState(() => {
      return {
        List: tmpList,
      };
    });
  };
  // ---------------------------------------
  render() {
    const { List } = this.state;
    return (
      <Fragment>
        <Header />
        <ContactList
          onDelete={this.onDelete}
          onRemoveStatus={this.onRemoveStatus}
          ContactList={List}
        />
        <Footer />
      </Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
