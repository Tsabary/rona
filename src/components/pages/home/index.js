import React from "react";
import BoxedButton from "../../formComponents/boxedButton";

const Home = () => {
  return (
    <div className="home">
      <a href="#new-item">
        <BoxedButton text="Click me" />
      </a>
    </div>
  );
};

export default Home;
