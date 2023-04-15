import React, { useState } from 'react'
import { Knight } from '../Knight/Knight';
import { Square } from '../Square/Square';



export const Board = () => {

  const [knightPosition, setKnightPosition] = useState([1, 7]);
  
  function moveKnight(toX, toY) {
    setKnightPosition([toX, toY]);
  }

  function handleMoveKnight(toX, toY) {
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY);
    }
  }

  function renderSquare(caseNumber, [knightX, knightY]) {
    const x =  caseNumber % 8;
    const y = Math.floor(caseNumber / 8);
    const black = (x + y) % 2 === 1;
    const isKnightHere = knightX === x && knightY === y;
    const piece = isKnightHere ? <Knight /> : null;

    return (
        <div
          className='squareWrapper'
          key={caseNumber}
          onClick={() => handleMoveKnight(x, y)}
        >
          <Square 
            black={black}
          >
            {piece}
          </Square>
        </div>
      )
  }

  function canMoveKnight(toX, toY) {
    const [x, y] = knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }
 

  const squares = [];
  for (let caseNumber = 0; caseNumber < 64; caseNumber++) {
    squares.push(renderSquare(caseNumber, knightPosition));
  }


  return (
    <div
      className='boardWrapper'
    >
      
      {squares}
    </div>
  )
}

