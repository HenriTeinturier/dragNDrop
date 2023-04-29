import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./dragndropTest.scss";
import { useDrag, useDrop } from "react-dnd";
import { changeFolderItem } from "./Functions/functions";

const INITIAL_LIST = [
  {
    id: "1",
    firstName: "Henri",
    lastName: "Teinturier",
    folder: "racine",
  },
  {
    id: "2",
    firstName: "Julie",
    lastName: "De Vos",
    folder: "racine",
  },
  {
    id: "3",
    firstName: "Enzo",
    lastName: "Teinturier",
    folder: "racine",
  },
  {
    id: "4",
    firstName: "Malo",
    lastName: "Teinturier",
    folder: "racine",
  },
  {
    id: "5",
    firstName: "Lisa",
    lastName: "Teinturier",
    folder: "racine",
  },
];

const ItemTypes = {
  ITEM: "item",
};

const List = ({ list, setActiveFolder, activeFolder }) => (
  <div className="listWrapper">
    {list
      .filter((item, index) => item.folder === activeFolder)
      .map((item, index) => (
        <Item key={item.id} index={index} item={item} />
      ))}
  </div>
);

const Item = ({ index, item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { item },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      const getItem = monitor.getItem();
      const didDrop = monitor.didDrop();
      // console.log("item", item);
      // console.log("monitor", monitor);
      // console.log("dropResult", dropResult);
      // console.log("getItem", getItem);
      // console.log("didDrop", didDrop);
      // console.log("isDragging", isDragging);
      if (item && dropResult) {
        console.log(`You dropped ${item} into ${dropResult}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      className="listItem"
      ref={drag}
      style={{
        backgroundColor: isDragging ? "crimson" : "",
        opacity: isDragging ? "0.9" : "",
      }}
    >
      {item.firstName} {item.lastName}
    </div>
  );
};

const MenuItem = ({ index, active, setActiveFolder, list, setList }) => {
  const newFolder = index;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: (item, monitor) => changeFolderItem(item, list, setList, newFolder),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <div
      ref={drop}
      index={index}
      key={index}
      className={`${active ? "active" : ""}  headerItem`}
      style={{ backgroundColor: isOver ? "crimson" : "" }}
      onClick={() => setActiveFolder(index)}
    >
      {index}
    </div>
  );
};

const Header = ({
  onDragEnd,
  activeFolder,
  setActiveFolder,
  list,
  setList,
}) => {
  return (
    //  <DragDropContext onDragEnd={onDragEnd}>
    <div className="headerWrapper">
      <MenuItem
        index="racine"
        key="racine"
        active={activeFolder === "racine"}
        setActiveFolder={setActiveFolder}
        setList={setList}
        list={list}
      />
      <MenuItem
        index="sub"
        key="sub"
        active={activeFolder === "sub"}
        setActiveFolder={setActiveFolder}
        setList={setList}
        list={list}
      />
      <MenuItem
        index="subsub"
        key="subsub"
        active={activeFolder === "subsub"}
        setActiveFolder={setActiveFolder}
        setList={setList}
        list={list}
      />
    </div>
  );
};

export const DragndropTest = () => {
  const [list, setList] = useState(INITIAL_LIST);
  const [activeFolder, setActiveFolder] = useState("racine"); //

  // useEffect(() => {
  //   setList(INITIAL_LIST);
  // }, []);

  return (
    <>
      <Header
        setActiveFolder={setActiveFolder}
        activeFolder={activeFolder}
        setList={setList}
        list={list}
      />
      <List
        list={list}
        setActiveFolder={setActiveFolder}
        activeFolder={activeFolder}
      />
    </>
  );
};

// export default DragnDropByRw
