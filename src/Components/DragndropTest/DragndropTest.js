import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./dragndropTest.scss";
import { useDrag, useDragLayer, useDrop } from "react-dnd";
import { changeFolderItem } from "./Functions/functions";
import { motion } from "framer-motion";

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
  const constraintsRef = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM, //* ItemTypes est utilie si on veut utiliser typescript en créeant un objet type. Peut etre utilie également si on veut réutiliser à différents endroits. On aurait pu mettre tout simplement type: "item". C'est une clé pour rreconnaître ce type d'élement. L'élément est ce que nous souhaitons déplacer.
    item: { item }, //* item sera récupérable dans le drop du drop via item. Dedans j'ai mis item mais j'aurais pu mettre n'importe quoi.
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // const getItem = monitor.getItem();
      // const didDrop = monitor.didDrop();
      if (item && dropResult) {
        console.log(`You dropped ${item} into ${dropResult}!`);
      }
    },
    //* collect est optionnel. Mais si nous voulons récupérer isDragging ou autres c'est utile
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      // handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <>
      {/*   {!isDragging && ( */}
      <motion.div drag>
        <motion.div
          // drag
          className="listItem"
          ref={drag}
          // onMouseDown={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            console.log(e);
          }}
          style={{
            backgroundColor: isDragging ? "crimson" : "",
            opacity: isDragging ? "1" : "",
            // border: isDragging ? "5px solid white" : "",
          }}
        >
          {item.firstName} {item.lastName}
        </motion.div>
      </motion.div>

      {/* )} */}
      {/* {isDragging && (
        <div
          className="listItem dragPreview"
          style={{
            ...previewStyle,
          }}
        >
          {item.firstName} {item.lastName}
        </div>
      )} */}
    </>
  );
};

const MenuItem = ({ index, active, setActiveFolder, list, setList }) => {
  const newFolder = index;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM, //* Comme son nom l'indique le type précédemment défini qui est accepté.
    drop: (item) => changeFolderItem(item, list, setList, newFolder),
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
