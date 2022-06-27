import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "../App.css";
import Routes from "./Routes";

const Tabs = ({ cardState, setCardState }) => {
  const history = useHistory();
  const tabsData = ["Your", "All", "Blocked"];

  const handleChange = (state) => {
    setCardState(state);
    
    switch (state) {
      case "All":
        history.push("/all-cards");
        break;

      case "Your":
        history.push("/my-cards");
        break;

      case "Blocked":
        history.push("/blocked-cards");
        break;

      default:
        break;
    }
  };

  return (
    <>
      <ul className="list-style">
        {tabsData.map((elem, index) => {
          let style = elem === cardState ? "selected" : "";
          return (
            <li
              key={index}
              className={style}
              onClick={() => handleChange(elem)}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tabs;
