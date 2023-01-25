import React from "react";
import { useDrop } from "react-dnd";

export default function DropBackground({ children }) {
  const [{ isOver }, bgDrop] = useDrop(() => ({
    accept: "ROOM",
    bgDrop: () => ({ blockNum: null, type: "secondary" }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className={`background ${isOver ? "over" : ""}`} ref={bgDrop}>
      {children}
    </div>
  );
}
