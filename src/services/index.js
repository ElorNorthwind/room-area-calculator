import { parseWorksheet } from "./excelParseService";
import { readWorksheet } from "./excelReadService";
import { readFile } from "./fileService";

export async function readAndParseXmls(file, dispatch) {
  const buffer = await readFile(file, dispatch);
  const ws = await readWorksheet(buffer, dispatch);
  const roomsData = parseWorksheet(ws, dispatch);
  return { ...roomsData };
}
