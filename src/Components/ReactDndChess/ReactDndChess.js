import React, { useState } from 'react'
import './reactDndChess.scss';
import { Knight } from './Knight/Knight';
import { Square } from './Square/Square';
import { Board } from './Board/Board';

export const ReactDndChess = () => {

  

  return (
    <>
      <div
        className='reactDndChessTitle'  
      >
        ReactDndChess
      </div>
      <div className='chessWrapper'>

        <Board />

      </div>
    </>

  )
}
