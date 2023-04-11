import React from 'react'
import './reactDndChess.scss';
import { Knight } from './Knight/Knight';
import { Square } from './Square/Square';

export const ReactDndChess = () => {
  return (
    <div>
    <div>ReactDndChess</div>
    <Square black >
      <Knight />
    </Square>
    <Square >
      <Knight />
    </Square>

    </div>
  )
}
