import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  setModalArea,
  setModalBlock,
  toggleModal,
} from "../../store/uiReducer";
import RoomList from "../RoomList/RoomList";

export default function Block({ block }) {
  const dispatch = useDispatch();

  const openModal = (type) => {
    dispatch(toggleModal());
    dispatch(setModalBlock(block.blockNum));
    dispatch(setModalArea(type));
  };

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
          <div
            className="s_block_obsh clickable_number"
            onClick={() => openModal("obsh")}
          >
            {block.sBlockObsh}
          </div>
          <div
            className="s_block_zhp clickable_number"
            onClick={() => openModal("zhp")}
          >
            {block.sBlockZhP}
          </div>
        </>
      )}
    </div>
  );
}
