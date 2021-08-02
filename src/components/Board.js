import React from "react";
import Block from "./Block";
import "../styles/grid.css";
import Swipe from "react-easy-swipe";
const Board = (props) => {
  const { data } = props;
  return (
    <div className='grid'>
      {data.map((row, rowIndex) => (
        <div style={{ display: "flex" }} key={rowIndex}>
          {row.map((digit, index) => (
            <Block num={digit} key={index}></Block>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
