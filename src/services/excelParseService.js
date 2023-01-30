import { setRoomsStatusAction } from "../store/roomsReducer";
import { initialSortRooms } from "./roomsCalculateService";

export function parseWorksheet(ws, dispatch) {
  const adress = ws.getRow(4).getCell(3).value;
  const appNumber =
    (/^Квартира №:/.test(ws.getRow(6).getCell(1).value) &&
      ws.getRow(6).getCell(1).value) ||
    (/^Квартира №:/.test(ws.getRow(7).getCell(1).value) &&
      ws.getRow(7).getCell(1).value);
  const floorNumber =
    (/^\d+$/.test(ws.getRow(11).getCell(1).value) &&
      ws.getRow(11).getCell(1).value) ||
    (/^\d+$/.test(ws.getRow(12).getCell(1).value) &&
      ws.getRow(12).getCell(1).value);
  const arr = [];

  if (!appNumber || !floorNumber) {
    console.log(appNumber);
    console.log(floorNumber);
    dispatch(setRoomsStatusAction("error"));
    return {
      rooms: [],
      status: "error",
      adress: null,
      floorNumber: null,
      appNumber: null,
    };
  }

  ws.eachRow(function (row) {
    const r = row.values;
    if (r[1] === floorNumber) {
      arr.push(parseRow(r));
    }
  });

  dispatch(setRoomsStatusAction("succsess"));
  return {
    rooms: initialSetBlockNums(arr.sort(initialSortRooms)),
    adress: /(?:Москва.*?, )(?:.*?округ.*?, )?(.*)$/i.exec(adress)?.[1],
    floorNumber,
    appNumber: /№: (.*)$/i.exec(appNumber)?.[1],
  };
}

function parseRow(rowArr) {
  const regex = /(\d+)([а-я])?/gi;
  const [, num, letter] = regex.exec(rowArr[2]);

  const parseArea = (area) => {
    return Number((area || "0").replace(",", "."));
  };

  return {
    num: Number(num || null),
    letter: letter || null,
    label: rowArr[2],
    desc: rowArr[5],
    sMain: parseArea(rowArr[9]),
    sSecondary: parseArea(rowArr[10]),
    sSummer:
      parseArea(rowArr[11]) + parseArea(rowArr[12]) + parseArea(rowArr[13]),
  };
}

function initialSetBlockNums(rooms) {
  return rooms.map((room) => ({
    ...room,
    blockNum: rooms.some((e) => e.sMain > 0 && e.num === room.num)
      ? room.num
      : null,
  }));
}
