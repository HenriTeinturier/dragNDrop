import React, {useContext} from 'react'
import { Navbar} from '../Navbar/Navbar';
import { DragnDropByRw } from '../DragnDropByRw/DragnDropByRw';
import { TodoList } from '../../features/todos/TodoList';
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
      
    </div>
  )
}

// export default Layout