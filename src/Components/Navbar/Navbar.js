import React, {useContext} from 'react'
import  {ScreenContext}  from '../../App';
import './navbar.scss';

export const Navbar = () => {
const {setActiveScreen} = useContext(ScreenContext);


  return (
    <div style={{display: 'flex', justifyContent: 'center', color: 'white', marginBottom: '1rem'}}>
      <div className="item" onClick={() => {setActiveScreen('todoList')}}>Todo List from Dave Grave</div>
      <div  className="item"  onClick={() => {setActiveScreen('dragnDropByRw')}}>Drag and Drop from rw</div>
      <div  className="item"  onClick={() => {setActiveScreen('dragndropTest')}}>Dragndrop Test</div>
    </div>
  )
}

// export default navbar