import Excel from "exceljs";
import { setRoomsStatusAction } from "../store/roomsReducer";

export async function readWorksheet(buffer, dispatch) {
  try {
    const wb = new Excel.Workbook();
    const workbook = await wb.xlsx.load(buffer);
    return workbook.getWorksheet(1);
  } catch (e) {
    console.log(e);
    dispatch(setRoomsStatusAction("error"));
  }
}
