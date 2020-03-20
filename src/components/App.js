import "../styles/styles.scss";
import "./styles.scss";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./header";

import { AuthProvider } from "../providers/Auth";

import history from "../history";

import SignUp from "./popups/signUp";

import UpdateProfile from "./popups/updateProfile";
import NewRequest from "./popups/newRequest";

import Feed from "./pages/feed";
import MyPosts from "./pages/myPosts";
import Contact from "./pages/contact";

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <div className="app">
          <SignUp />
          <UpdateProfile />
          <NewRequest />
          <Header />
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/my-posts" exact component={MyPosts} />
            <Route path="/contact" exact component={Contact} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
