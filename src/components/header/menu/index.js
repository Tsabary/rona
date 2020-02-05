import "./styles.scss";
import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/feed" className="menu__item" key="feed">
        Feed
      </Link>

      <Link to="/search" className="menu__item" key="search">
        Search
      </Link>
      
      <Link to="/contact" className="menu__item" key="contact">
        Contact
      </Link>


      <div className="menu__item menu__dropdown">
        <div className="menu__dropdown-title">Top category</div>
        <div className="menu__item menu__dropdown-content">
          <Link
            to="/top-category/sub-cat-1"
            className="menu__item"
            key="sub-cat-1"
          >
            sub cat 1
          </Link>
          <Link
            to="/top-category/sub-cat-2"
            className="menu__item"
            key="sub-cat-2"
          >
            sub cat 2
          </Link>
          <Link
            to="/top-category/sub-cat-3"
            className="menu__item"
            key="sub-cat-3"
          >
            sub cat 3
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Menu;

// const Menu = () => {
//   const renderMenu = () => {
//     const pages = [
//       { text: "About us", link: "/about-us" },
//       { text: "Donate", link: "/donate" },
//       { text: "Events", link: "/events" },
//       { text: "Burning Man", link: "/burning-man" },
//       { text: "Contact", link: "/contact" }
//     ];
//     return pages.map(page => {
//       return (
//         <Link to={page.link} className="menu__item" key={page.text}>
//           {page.text}
//         </Link>
//       );
//     });
//   };

//   return <div className="menu">{renderMenu()}</div>;
// };

// export default Menu;
