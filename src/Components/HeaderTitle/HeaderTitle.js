import React from 'react'
import './headerTitle.scss';

export const HeaderTitle = ({activeScreen}) => {
  console.log('activescreen', activeScreen)

  let title = "";
  if (activeScreen === 'todoList') { title =  'Todo List from Dave Grave. UseQuery, useMutation, react-beautiful-dnd'}
  if (activeScreen === 'dragnDropByRw') { title =  'React-beautiful-dnd by Rwieruch'}
  if (activeScreen === 'dragndropTest') { title =  'React-dnd for projects test folder gestion'}
  if (activeScreen === 'reactdnd') { title =  'Chess tutorial from react-dnd'}


  return (
    <div className='headerTitleWrapper'>
      <div className='headerTitle'>{title}</div>
    </div>
  )
}
