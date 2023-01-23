import React from "react";
import { useDrop } from "react-dnd";
import RoomList from "../RoomList/RoomList";

export default function Block({ block }) {
  // const [{ isOver }, drop] = useDrop(
  //   () => ({
  //     accept: ItemTypes.KNIGHT,
  //     drop: () => moveKnight(x, y),
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //     }),
  //   }),
  //   [x, y]
  // );

  return (
    <div className={`block_item block__${block.type}`}>
      <RoomList rooms={block.rooms}></RoomList>
      <div className="block_num">
        {block.type === "main" ? block.blockNum : ""}
      </div>
      <div className="s_main_sum">{block.sBlockMainSum}</div>
      <div className="s_block_obsh">{block.sBlockObsh}</div>
      <div className="s_block_zhp">{block.sBlockZhP}</div>
    </div>
  );
}
