// React
import React, { Component } from "react";
import ReactDOM from "react-dom";

//Css
import "./index.css";

//Component
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactList from "./Components/ContactList/ContactList";
import About from "./Components/About/About";
import NotFound from "./Components/NotFound/NotFound";
import AddContact from "./Components/AddContact/AddContact";
import EditContact from "./Components/EditContact/EditContact";
import Contact from "./Components/Contact/Contact";

//Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact render={() => <ContactList />} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/add-contact' render={() => <AddContact />} />
            <Route path='/edit-contacts' render={() => <EditContact />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
