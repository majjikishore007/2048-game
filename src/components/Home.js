import React from "react";
import "../styles/home.css";

const Home = () => {
  const handleClick = (e) => {
    console.log("hello");
  };
  return (
    <>
      <div className='area'>
        <div className='container'>
          <header>
            <h1>
              <span>2</span>
              <span>0</span>
              <span>4</span>
              <span>8</span>
            </h1>
          </header>
          <div className='directions'>
            <div>
              {" "}
              <p>
                <strong>HOW TO PLAY:</strong> Use your arrow keys to move the
                tiles. When two tiles slide into each other, they merge into
                one!
              </p>
            </div>
            <button
              onClick={() => {
                console.log("hello");
              }}
              className='btn-play'
            >
              Play
            </button>
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
      </div>
    </>
  );
};

export default Home;
