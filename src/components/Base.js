import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import Board from "./Board";
import { useEvent } from "./util";
import Swipe from "react-easy-swipe";
import { Link, Redirect, withRouter } from "react-router-dom";
const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
  newGameButton: {
    padding: 20,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 95,
    borderRadius: 7,
    fontWeight: "900",
    marginLeft: "auto",
    marginBottom: "auto",
    cursor: "pointer",
  },
  tryAgainButton: {
    padding: 20,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
    marginBottom: 20,
  },
  scoreBorad: {
    padding: 20,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
    marginBottom: 20,
  },
  home: {
    padding: 20,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
    marginBottom: 20,
    textDecoration: "none",
  },
  gameOverOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    borderRadius: 5,
    background: "rgba(238,228,218,.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
const Base = () => {
  //defining arrow keys
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  //initialize
  const initialize = () => {
    let newGrid = cloneDeep(data);
    // addnumers
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };
  // addnumers
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;
        let gameOverr = checkIfGameOver();
        if (gameOverr) {
          alert("game over");
          // setGameOver(true);
        }
        setGameOver(true);
      }
    }
  };
  // swipe
  //left

  const swipeLeft = (dummy) => {
    console.log("swipe left");
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      console.log(`SLOW ${slow} AND FAST ${fast}`);
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            let newScore = score + b[slow];
            setScore(newScore);
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };
  const swipeRight = (dummy) => {
    console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            let newScore = score + b[slow];
            setScore(newScore);
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeDown = (dummy) => {
    console.log("swipe down");
    console.log(data);
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            let newScore = score + b[slow][i];
            setScore(newScore);
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const swipeUp = (dummy) => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            let newScore = score + b[slow][i];
            setScore(newScore);
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };
  // check game over
  const checkIfGameOver = () => {
    console.log("CHECKING GAME OVER");
    // let original = cloneDeep(data);
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
    console.log("CHECKER DOWN");
    console.table(data);
    console.table(checker2);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }
    return true;
  };
  //reset
  const resetGame = () => {
    setGameOver(false);
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };

  // event hanldler

  const handleKeys = (event) => {
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        // alert("up");
        // console.table(data);
        swipeUp();
        // console.table(data);
        break;
      case DOWN_ARROW:
        // console.table(data);
        swipeDown();
        // console.table(data);
        break;
      case LEFT_ARROW:
        // console.table(data);
        swipeLeft();
        // console.table(data);
        break;
      case RIGHT_ARROW:
        // console.table(data);
        swipeRight();
        // console.table(data);
        break;
      default:
        break;
    }

    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  // add events
  useEvent("keydown", handleKeys);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={style.scoreBorad} className='score'>
          {`Score: ${score}`}
        </div>
        <div onClick={resetGame} style={style.tryAgainButton}>
          New Game
        </div>
      </div>
      {gameOver && (
        <div style={style.gameOverOverlay}>
          <div>
            <div
              style={{
                fontSize: 30,
                fontFamily: "sans-serif",
                fontWeight: "900",
                color: "#776E65",
              }}
            >
              {`Game over and your score is ${score}`}
            </div>
            <div>
              <div
                style={{
                  flex: 1,
                  marginTop: "auto",
                }}
              >
                <div onClick={resetGame} style={style.tryAgainButton}>
                  Try Again
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Swipe
        onSwipeDown={() => {
          swipeDown();
        }}
        onSwipeLeft={() => swipeLeft()}
        onSwipeRight={() => swipeRight()}
        onSwipeUp={() => swipeUp()}
        style={{ overflowY: "hidden" }}
      >
        <Board data={data}></Board>
      </Swipe>
      <div style={style.home}>
        <Link style={style.home} to='/' className=''>
          Home
        </Link>
      </div>
    </>
  );
};

export default Base;
