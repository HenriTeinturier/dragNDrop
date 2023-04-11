import React, {useContext} from 'react'
import { Navbar} from '../Navbar/Navbar';
import { DragnDropByRw } from '../DragnDropByRw/DragnDropByRw';
import { TodoList } from '../../features/todos/TodoList';
import { DragndropTest } from '../DragndropTest/DragndropTest';
import  {ScreenContext}  from '../../App';
import { HeaderTitle } from '../HeaderTitle/HeaderTitle';
import { ReactDndChess } from '../ReactDndChess/ReactDndChess';

export const Layout = () => {
  const {activeScreen} = useContext(ScreenContext);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <HeaderTitle activeScreen={activeScreen} />
      {
        activeScreen === 'dragnDropByRw' && <DragnDropByRw />
      }
      {
        activeScreen === 'todoList' && <TodoList />
      }
      {
        activeScreen === 'dragndropTest' && <DragndropTest />
      }
      {
        activeScreen === 'reactdnd' && <ReactDndChess />
      }

      
    </div>
  )
}

// export default Layout