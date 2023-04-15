import React from 'react'

export const Square = ({ black, children }) => {
  const fill = black ? 'black' : 'white';
  const stroke = black ? 'white' : 'black';
  return (
    <div 
      className='square'
      style={{
        backgroundColor: fill, 
        // height: '100px', 
        // width: '100px', 
        // display: 'flex', 
        // justifyContent: 'center', 
        // alignItems: 'center', 
        color: stroke,
        // fontSize: '4rem'
      }} 
    >
      {children}
    </div>
  )
}
