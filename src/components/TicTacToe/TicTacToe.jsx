import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill('')); // Board state
  const [count, setCount] = useState(0); // Turn counter
  const [lock, setLock] = useState(false); // Game lock when someone wins
  const titleRef = useRef(null); // Title reference

  // Toggle between X and O
  const toggle = (index) => {
    if (lock || data[index] !== '') return; // If game is locked or cell is already filled, return

    const newData = [...data];
    if (count % 2 === 0) {
      newData[index] = 'x'; // X's turn
    } else {
      newData[index] = 'o'; // O's turn
    }

    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  // Check for winning combinations
  const checkWin = (newData) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]); // Call won function if we have a winner
        return;
      }
    }

    // If all boxes are filled and no winner
    if (!newData.includes('')) {
      titleRef.current.innerHTML = "It's a draw!";
      setLock(true);
    }
  };

  // Function to handle the winning player
  const won = (winner) => {
    setLock(true);
    if (winner === 'x') {
      titleRef.current.innerHTML = `Congratulations: <img src="${cross_icon}" alt="X" />`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src="${circle_icon}" alt="O" />`;
    }
  };

  // Reset the game
  const reset = () => {
    setData(Array(9).fill('')); // Reset the board
    setCount(0); // Reset turn counter
    setLock(false); // Unlock the game
    titleRef.current.innerHTML = 'Tic Tac Toe in <span>React</span>'; // Reset title
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        {data.map((value, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {value === 'x' && <img src={cross_icon} alt="X" />}
            {value === 'o' && <img src={circle_icon} alt="O" />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;