import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { roomsToBlocks } from "../../services/roomsCalculateService";
import Block from "../Block/Block";

export default function BlockList() {
  const blocks = roomsToBlocks(useSelector((state) => state.rooms.rooms));
  return blocks.length > 0 ? (
    <div className="Wrapper">
      <DndProvider backend={HTML5Backend}>
        <div className="block_list">
          {blocks.map((block) => (
            <Block block={block} key={block.blockNum} />
          ))}
        </div>
      </DndProvider>
    </div>
  ) : (
    <></>
  );
}
