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

const List = ({ list, onDragEnd, setActiveFolder, activeFolder }) => (

  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div className='listWrapper' ref={provided.innerRef} {...provided.droppableProps}>
          {
            list.filter((item, index) => (item.folder === activeFolder))
              .map((item, index) => (
                <Item key={item.id} index={index} item={item} />
              )
            )
          }
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const Item = ({ index, item }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <div
      className='listItem'
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {item.firstName} {item.lastName}
      </div>
    )}
  </Draggable>
);

const Header = ({onDragEnd, activeFolder, setActiveFolder}) => {

  return (
   <DragDropContext onDragEnd={onDragEnd}>

      <div className="headerWrapper">
        <div 
          className={`${activeFolder === 'racine' ? "active" : ""}  headerItem`}
          onClick={() => setActiveFolder('racine')}
        >
          Racine
        </div>
        <div 
          className={`${activeFolder === 'sub' ? "active" : ""}  headerItem`} 
          onClick={() => setActiveFolder('sub')}
        >
          Sous dossier
        </div>
        <div  
          className={`${activeFolder === 'subsub' ? "active" : ""}  headerItem`} 
          onClick={() => setActiveFolder('subsub')}
        >
          Sous sous dossier
        </div>
      </div>
    </DragDropContext>

  )
}

export const DragndropTest = () => {
  const [list, setList] = useState([]);
  const [activeFolder, setActiveFolder] = useState('racine'); //

  useEffect(() => {
    setList(INITIAL_LIST)
  }, [])

  const handleDragEnd = ({ destination, source }) => {
    console.log( 'source', source)
     if (!destination) return;
    const updatedList = list.filter((item, index) => index !== source.index);
     setList(updatedList);

    // setList(reorder(list, source.index, destination.index));
  };

  return (
    <>
      {/* <DragDropContext> */}
        <Header onDragEnd={handleDragEnd}  setActiveFolder={setActiveFolder} activeFolder={activeFolder} />
        <List list={list} onDragEnd={handleDragEnd} setActiveFolder={setActiveFolder} activeFolder={activeFolder} />
      {/* </DragDropContext> */}
    </>
  )
}

// export default DragnDropByRw