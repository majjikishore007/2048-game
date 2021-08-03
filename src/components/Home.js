import React from "react";
import "../styles/home.css";
import Base from "../components/Base";
import { Link, Redirect, withRouter } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className='container'>
        <header>
          <h1>
            <span>2</span>
            <span>0</span>
            <span>4</span>
            <span>8</span>
          </h1>
        </header>
        {/* <Base></Base> */}
        <section>{/* <Base></Base> */}</section>
        <div className='directions'>
          <div>
            {" "}
            <p>
              <strong style={{ color: "#6A1B4D", fontWeight: "800" }}>
                HOW TO PLAY:
              </strong>{" "}
              Use your arrow keys to move the tiles. When two tiles slide into
              each other, they merge into one!
            </p>
          </div>
          <Link to='/game' className='btn-play'>
            Play
          </Link>
        </div>
      </div>
      <ul className='circles'>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
};

export default Home;
