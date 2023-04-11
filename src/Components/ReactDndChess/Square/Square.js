import React from 'react'

export const Square = ({ black, children }) => {
  const fill = black ? 'black' : 'white'
  return <div style={{ backgroundColor: fill, height: '35px', width: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >{children}</div>
}
