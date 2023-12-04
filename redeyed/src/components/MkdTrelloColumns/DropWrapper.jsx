import React from "react";
import { useDrop } from "react-dnd";
import { statuses } from "./data";
import ITEM_TYPE from "./data/types";

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="h-full min-h-[50px] w-full rounded-[5px] bg-neutral-100 p-6 text-neutral-700 shadow-lg dark:bg-[#007A52] dark:text-neutral-700 dark:shadow-black/30 "
    >
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;

          