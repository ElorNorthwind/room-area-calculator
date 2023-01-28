import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAndParseXmls } from "../../services";
import { createExcelReport } from "../../services/excelExportService";
import { addRoomsAction, setRoomsStatusAction } from "../../store/roomsReducer";

export default function FileSelector() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.rooms.status);
  const rooms = useSelector((state) => state.rooms.rooms);
  const fileInputRef = useRef();

  async function parseXmls() {
    const results = await readAndParseXmls(fileInputRef.current.files[0]);

    dispatch(addRoomsAction(results.rooms));
    dispatch(
      setRoomsStatusAction(
        results.adress +
          ", квартира " +
          results.appNumber +
          " (" +
          results.floorNumber +
          " этаж)"
      )
    );
  }

  return (
    <div className="Wrapper">
      <div class="controls">
        <input
          className="file_selector"
          type="file"
          ref={fileInputRef}
          accept=".xlsx"
          onChange={() => parseXmls()}
        />
        <input
          className="export_button"
          type="button"
          onClick={() => createExcelReport(rooms)}
          value="в эксель"
        />
      </div>
      <div className="AppLabel">
        <h3>{status}</h3>
      </div>
    </div>
  );
}
