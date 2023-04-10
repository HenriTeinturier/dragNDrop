import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import "./dragndropTest.scss"

const INITIAL_LIST = [
  {
    id: '1',
    firstName: 'Henri',
    lastName: 'Teinturier',
    folder: 'racine'
  },
  {
    id: '2',
    firstName: 'Julie',
    lastName: 'De Vos',
    folder: 'racine'

  },
  {
    id: '3',
    firstName: 'Enzo',
    lastName: 'Teinturier',
    folder: 'racine'
  },
  {
    id: '4',
    firstName: 'Malo',
    lastName: 'Teinturier',
    folder: 'racine'
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Teinturier',
    folder: 'racine'
  },
  
];

const List = ({ list, setActiveFolder, activeFolder }) => 

 (
        <div className='listWrapper'>
          {
            list.filter((item, index) => (item.folder === activeFolder))
              .map((item, index) => (
                <Item key={item.id} index={index} item={item} />
              )
            )
          }
        </div>

);

const Item = ({ index, item }) => (

      <div
      className='listItem'
         >
        {item.firstName} {item.lastName}
      </div>

);

const Header = ({onDragEnd, activeFolder, setActiveFolder}) => {

  return (
  //  <DragDropContext onDragEnd={onDragEnd}>

        <div className="headerWrapper">
          <div 
            index={'racine'}
            key={'racine'}
            className={`${activeFolder === 'racine' ? "active" : ""}  headerItem`}
            onClick={() => setActiveFolder('racine')}
          >
            Racine
          </div>
          <div 
            index={'sub'}
            key={'sub'}
            className={`${activeFolder === 'sub' ? "active" : ""}  headerItem`} 
            onClick={() => setActiveFolder('sub')}
          >
            Sous dossier
          </div>
          <div  
            index={'subsub'}
            key={'subsub'}
            className={`${activeFolder === 'subsub' ? "active" : ""}  headerItem`} 
            onClick={() => setActiveFolder('subsub')}
          >
            Sous sous dossier
          </div>
        </div>

  )
}

export const DragndropTest = () => {
  const [list, setList] = useState([]);
  const [activeFolder, setActiveFolder] = useState('racine'); //

  useEffect(() => {
    setList(INITIAL_LIST)
  }, [])



  return (
    <>

        <Header  setActiveFolder={setActiveFolder} activeFolder={activeFolder} />
        <List list={list} setActiveFolder={setActiveFolder} activeFolder={activeFolder} />
    </>
  )
}

// export default DragnDropByRw