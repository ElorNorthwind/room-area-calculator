import React from "react";
import { useSelector } from "react-redux";
import { roomsToBlocks } from "../../services/roomsCalculateService";
import Block from "../Block/Block";

export default function BlockList() {
  const blocks = roomsToBlocks(useSelector((state) => state.rooms.rooms));
  return (
    <div className="Wrapper">
      <div className="block_list">
        {blocks.length > 0 ? (
          blocks.map((block) => <Block block={block} key={block.blockNum} />)
        ) : (
          <div>Нихуя нет</div>
        )}
      </div>
    </div>
  );
}
