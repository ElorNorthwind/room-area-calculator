import { parseWorksheet } from "./excelParseService";
import { readWorksheet } from "./excelReadService";
import { readFile } from "./fileService";

export async function readAndParseXmls(file) {
  const buffer = await readFile(file);
  const ws = await readWorksheet(buffer);
  const roomsData = parseWorksheet(ws);
  return { ...roomsData };
}
