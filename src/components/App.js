import "./styles.scss";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./header";
import Global from "../styles/global";

import { AuthProvider } from "../providers/Auth";

import history from "../history";

import SignUp from "./forms/signUp";
import LogIn from "./forms/login";
import NewItem from "./forms/newItem";
import UpdateProfile from "./forms/updateProfile";

import Home from "./pages/home";
import Feed from "./pages/feed";
import Search from "./pages/search";
import Contact from "./pages/contact";

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <div className="app">
          <Global />

          <SignUp />
          <LogIn />
          <NewItem />
          <UpdateProfile />

          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/feed" exact component={Feed} />
            <Route path="/search" exact component={Search} />
            <Route path="/contact" exact component={Contact} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
