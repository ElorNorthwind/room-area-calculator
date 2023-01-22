import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAndParseXmls } from "../../services";
import { addRoomsAction, setRoomsStatusAction } from "../../store/roomsReducer";

export default function FileSelector() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.rooms.status);
  const fileInputRef = useRef();

  async function parseXmls() {
    const results = await readAndParseXmls(fileInputRef.current.files[0]);

    dispatch(addRoomsAction(results.rooms));
    dispatch(setRoomsStatusAction(results.adress));
  }

  return (
    <div className="Wrapper">
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx"
        onChange={() => parseXmls()}
      />
      <div className="AppLabel">
        <h3>{status}</h3>
      </div>
    </div>
  );
}
