import "../styles/styles.scss";
import "./styles.scss";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

import { AuthProvider } from "../providers/Auth";

import history from "../history";

import SignUp from "./popups/signUp";

import UpdateProfile from "./popups/updateProfile";

import Home from "./pages/home";
import Feed from "./pages/feed";
import Search from "./pages/search";
import Contact from "./pages/contact";
import ItemInfo from "./pages/itemInfo";
import EditItem from "./pages/editItem";
import NewItem from "./pages/newItem";
import Careers from "./pages/careers";
import Apply from "./pages/apply";
import About from "./pages/about";

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <div className="app">
 
          <SignUp />
          {/* <NewItem /> */}
          <UpdateProfile />

          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/feed" exact component={Feed} />
            <Route path="/search" exact component={Search} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/item/:id" exact component={ItemInfo} />
            <Route path="/edit-item/:id" exact component={EditItem} />
            <Route path="/new-item" exact component={NewItem} />
            <Route path="/careers" exact component={Careers} />
            <Route path="/careers/:id" exact component={Apply} />
          </Switch>
          <div className="app__footer">
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
