import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "./data/types";
import InstandEditor from "./InstandEditor";

const Item = ({ item, index, moveItem, list, getData }) => {
  const ref = useRef(null);
  const [showInstandEditor, setShowInstandEditor] = React.useState(false);
  const [show, setShow] = useState(false);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { type: ITEM_TYPE, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <Fragment>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className="group relative rounded-[5px]"
      >
        <div
          onClick={onOpen}
          className="z-10 mb-[10px] flex justify-between bg-white px-3 py-[6px] text-[15px] first:rounded-[5px] hover:cursor-pointer "
        >
          {/* <div
          className="  w-[40px] h-[7px] rounded-[5px] "
          style={{ backgroundColor: status.color }}
        /> */}
          <p className=" text-[15px] font-medium">{item.content}</p>
        </div>
        <button
          onClick={() => setShowInstandEditor(true)}
          className="absolute right-[3px] top-[3px] flex h-[25px] w-[25px] items-center justify-center rounded-sm text-right opacity-0 hover:bg-[#a8d9ff4b] group-hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-[14px] w-[15px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
      {show && <Window item={item} onClose={onClose} show={show} />}
      {showInstandEditor && (
        <InstandEditor
          setShowInstandEditor={setShowInstandEditor}
          item={item}
          list={list}
          getData={getData}
        />
      )}
    </Fragment>
  );
};

export default Item;

          