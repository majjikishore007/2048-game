import React from "react";
import "../styles/block.css";
import { getColors } from "../components/util.js";
import num16 from "../img/giphy.mp4";
const Block = (props) => {
  const { num } = props;
  return (
    <div
      className='block'
      style={{
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num != 0 ? num : " "}
      {/* {num16} */}
    </div>
  );
};

export default Block;
