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
          <div className="block_item block_item__header">
            <div className="room room__header">
              <div>№</div>
              <div>описание</div>
              <div>жил.</div>
              <div>вспом.</div>
              <div>летн.</div>
              <div>общ.</div>
              <div>ж.п.</div>
            </div>
            <div className="s_main_sum">S жил.</div>
            <div className="s_block_obsh">S общ.</div>
            <div className="s_block_zhp">S ж.п.</div>
          </div>
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
