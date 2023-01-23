import { parseWorksheet } from "./excelParseService";
import { readWorksheet } from "./excelReadService";
import { readFile } from "./fileService";
import { roomsToBlocks, updateRoomsInfo } from "./roomsCalculateService";

export async function readAndParseXmls(file) {
  const buffer = await readFile(file);
  const ws = await readWorksheet(buffer);
  const roomsData = await parseWorksheet(ws);
  console.log(roomsToBlocks(roomsData.rooms));
  return { ...roomsData, rooms: updateRoomsInfo(roomsData.rooms) };
}
