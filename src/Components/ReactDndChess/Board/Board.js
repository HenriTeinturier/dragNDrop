import React, { useState } from 'react'
import { Knight } from '../Knight/Knight';
import { Square } from '../Square/Square';
import { useDrop } from 'react-dnd';

export const ItemTypes = {
  KNIGHT: 'knight'
}

export const Overlay = ({color}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  )
}

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

  function canMoveKnight(toX, toY) {
    const [x, y] = knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }


  function BoardSquare({ x, y, children }) {
    const black = (x + y) % 2 === 1
    const [ { canDrop, isOver } , drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMoveKnight(x, y),
      drop: () => moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    [x, y]
  )
  

    return (
      <div
        ref={drop}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <Square black={black}>{children}</Square>
        {!isOver && canDrop && (
        <Overlay color={'yellow'}
        />
      )}
       {isOver && !canDrop && (
        <Overlay color={'red'}
        />
      )}
       {isOver && canDrop && (
        <Overlay color={'green'}
        />
      )}

      </div>
    )
  }

  function renderPiece(x, y, [knightX, knightY]) {
    if (x === knightX && y === knightY) {
      return <Knight />
    }
  }

  
  function renderSquare(caseNumber, [knightX, knightY]) {
    const x =  caseNumber % 8;
    const y = Math.floor(caseNumber / 8);

    return (
        <div
          className='squareWrapper'
          key={caseNumber}
          onClick={() => handleMoveKnight(x, y)}
        >
          <BoardSquare x={x} y={y} >
            {renderPiece(x, y, knightPosition)}
          </BoardSquare>
        </div>
      )
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

