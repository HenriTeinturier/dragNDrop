import React from 'react'
import { ItemTypes } from '../Constant/Constants';
import { useDrag, DragPreviewImage } from 'react-dnd';
import whiteCavalier from './whiteCavalier.png';
import cavalier from './cavalier.jpg';

export const Knight = () => {
  
  const [{isDragging}, drag, preview] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const previewStyle = {
      width: '50px',
      height: '50px',
      backgroundColor: 'gray',
      border: '1px solid black',
      borderRadius: '50%'
    };

  // const testImage = () => {
  //   return <img width="50" height="50" src={whiteCavalier} />
  // }

  return (
    <>
      {/* <DragPreviewImage connect={preview} src={cavalier}  style={previewStyle}/> */}
        
      <span 
        className="knight" 
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          // fontSize: '8rem',
          // fontWeight: 'bold',
          // backgroundColor: isDragging ? 'transparent' : "",
          cursor: 'move'
        }}
      >
        ♘
      </span>
    </>
  )
}
