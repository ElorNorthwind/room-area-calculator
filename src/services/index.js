import { parseWorksheet } from "./excelParseService";
import { readWorksheet } from "./excelReadService";
import { readFile } from "./fileService";
import { updateRoomsInfo } from "./roomsCalculateService";

export async function readAndParseXmls(file) {
  const buffer = await readFile(file);
  const ws = await readWorksheet(buffer);
  const roomsData = await parseWorksheet(ws);
  return { ...roomsData, rooms: updateRoomsInfo(roomsData.rooms) };
}
