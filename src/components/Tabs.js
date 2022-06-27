import React from "react";
import { useHistory } from "react-router-dom";

import "../App.css";
import allPaths from "../helpers/allPaths";

const Tabs = ({ cardState, setCardState }) => {
  const history = useHistory();
  const tabsData = ["Your", "All", "Blocked"];

  const handleChange = (state) => {
    setCardState(state);
    
    switch (state) {
      case "All":
        history.push(allPaths.ALL_CARDS_ROUTE);
        break;

      case "Your":
        history.push(allPaths.MY_CARDS_ROUTE);
        break;

      case "Blocked":
        history.push(allPaths.BLOCKED_CARDS_ROUTE);
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
