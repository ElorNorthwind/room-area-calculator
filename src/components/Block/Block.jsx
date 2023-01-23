import React from "react";
import { useDrop } from "react-dnd";
import RoomList from "../RoomList/RoomList";

export default function Block({ block }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "ROOM",
      drop: () => ({ blockNum: block.blockNum, type: block.type }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [block.blocNum]
  );

  return (
    <div
      className={`block_item block__${block.type} ${isOver ? "over" : ""}`}
      ref={drop}
    >
      <RoomList rooms={block.rooms}></RoomList>
      {block.type === "main" && (
        <>
          {/* <div className="block_num">{block.blockNum}</div> */}
          <div className="s_main_sum">{block.sBlockMainSum}</div>
          <div className="s_block_obsh">{block.sBlockObsh}</div>
          <div className="s_block_zhp">{block.sBlockZhP}</div>
        </>
      )}
    </div>
  );
}
