import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAndParseXmls } from "../../services";
import { createExcelReport } from "../../services/excelExportService";
import { addRoomsAction } from "../../store/roomsReducer";
import StatusMessage from "../StatusMessage/StatusMessage";

export default function FileSelector() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const fileInputRef = useRef();

  async function parseXmls() {
    const results = await readAndParseXmls(
      fileInputRef.current.files[0],
      dispatch
    );

    dispatch(addRoomsAction(results));
    // dispatch(setRoomsStatusAction("success"));
  }

  return (
    <div className="Wrapper">
      <div className="controls">
        <input
          className="file_selector"
          type="file"
          ref={fileInputRef}
          accept=".xlsx"
          onChange={() => parseXmls()}
        />
        <input
          className="export_button"
          disabled={!(rooms?.length > 0)}
          type="button"
          onClick={() => createExcelReport(rooms)}
          value="Выгрузить в эксель"
        />
      </div>
      <StatusMessage />
    </div>
  );
}
