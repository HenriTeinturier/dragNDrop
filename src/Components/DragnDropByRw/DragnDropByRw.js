import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import "./dragndrop.scss"

const INITIAL_LIST = [
  {
    id: '1',
    firstName: 'Robin',
    lastName: 'Wieruch',
  },
  {
    id: '2',
    firstName: 'Aiden',
    lastName: 'Kettel',
  },
  {
    id: '3',
    firstName: 'Jannet',
    lastName: 'Layn',
  },
];

const List = ({ list, onDragEnd }) => (

  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided) => (
        <div className='listWrapper' ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Item key={item.id} index={index} item={item} />
          ))}
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

const Header = () => {

  return (
    <div className="headerWrapper">
      <div className="headerItem">Racine</div>
      <div className="headerItem" >Sous dossier</div>
      <div className="headerItem" >Sous sous dossier</div>
    </div>
  )
}

const reorder = (list, startIndex, endIndex) => {
  console.log('list', list, 'startIndex', startIndex, 'endIndex', endIndex)
  const result = Array.from(list);
  console.log('result', result)
  const [removed] = result.splice(startIndex, 1);
  console.log('removed', removed)
  result.splice(endIndex, 0, removed);
  console.log(result)

  return result;
};

export const DragnDropByRw = () => {
  const [list, setList] = React.useState(INITIAL_LIST);

  const handleDragEnd = ({ destination, source }) => {
    console.log('destination', destination, 'source', source)
     if (!destination) return;

    setList(reorder(list, source.index, destination.index));
  };

  return (
    <>
      {/* <DragDropContext> */}
        <Header />
        <List list={list} onDragEnd={handleDragEnd} />
      {/* </DragDropContext> */}
    </>
  )
}

// export default DragnDropByRw