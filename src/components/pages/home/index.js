import './styles.scss';
import React from "react";
import BoxedButton from "../../formComponents/boxedButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link to={"/new-item"}>
        {/* <a href="#new-item"> */}
          <BoxedButton text="Click me" />
        {/* </a> */}
      </Link>
    </div>
  );
};

export default Home;
