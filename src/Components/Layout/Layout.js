import React, {useContext} from 'react'
import { Navbar} from '../Navbar/Navbar';
import { DragnDropByRw } from '../DragnDropByRw/DragnDropByRw';
import { TodoList } from '../../features/todos/TodoList';
import { DragndropTest } from '../DragndropTest/DragndropTest';
import  {ScreenContext}  from '../../App';

export const Layout = () => {
  const {activeScreen} = useContext(ScreenContext);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      {
        activeScreen === 'dragnDropByRw' && <DragnDropByRw />
      }
      {
        activeScreen === 'todoList' && <TodoList />
      }
      {
        activeScreen === 'dragndropTest' && <DragndropTest />
      }
      
    </div>
  )
}

// export default Layout