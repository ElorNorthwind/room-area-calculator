import Excel from "exceljs";
import FileSaver from "file-saver";
import { roomsToBlocks } from "./roomsCalculateService";

export async function createExcelReport(rooms) {
  const blocks = roomsToBlocks(rooms);
  try {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet("Расчет площади", {
      pageSetup: {
        paperSize: 9,
        orientation: "portrait",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
      },
    });

    const centeredStyle = {
      alignment: { vertical: "middle", horizontal: "center" },
    };

    ws.columns = [
      { header: "№", key: "label", width: 8, style: centeredStyle },
      {
        header: "описание",
        key: "description",
        width: 24,
        style: { alignment: { vertical: "middle", horizontal: "left" } },
      },
      { header: "S жил.", key: "sMain", width: 8, style: centeredStyle },
      { header: "S вспом.", key: "sSecondary", width: 8, style: centeredStyle },
      { header: "S летн.", key: "sSummer", width: 8, style: centeredStyle },
      { header: "S общ", key: "sObsh", width: 8, style: centeredStyle },
      { header: "S ж.п.", key: "sZhP", width: 8, style: centeredStyle },
      { header: "блок", key: "blockNum", style: centeredStyle },
      { header: "тип блока", key: "type", style: centeredStyle },
      {
        header: "S жил. бл.",
        key: "sBlockMainSum",
        width: 9,
        style: centeredStyle,
      },
      {
        header: "S общ бл.",
        key: "sBlockObsh",
        width: 9,
        style: centeredStyle,
      },
      {
        header: "S ж.п. бл.",
        key: "sBlockZhP",
        width: 9,
        style: centeredStyle,
      },
    ];

    blocks.map((block) => addBlock(block, ws));
    styleWorksheet(ws);

    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "applicationi/xlsx" });
    FileSaver.saveAs(blob, "экспликация.xlsx");
  } catch (e) {
    console.log(e);
  }
}

function addBlock(block, ws) {
  const roomCount = block.rooms.length;

  ws.addRow({
    //Уровень первой комнаты
    label: block.rooms[0].label,
    description: block.rooms[0].desc,
    sMain: block.rooms[0].sMain,
    sSecondary: block.rooms[0].sSecondary,
    sSummer: block.rooms[0].sSummer,
    sObsh: block.rooms[0].sObsh,
    sZhP: block.rooms[0].sZhP,
    //Уровень блока
    blockNum: block.blockNum,
    type: block.type,
    sBlockMainSum: block.sBlockMainSum || 0,
    sBlockObsh: block.sBlockObsh,
    sBlockZhP: block.sBlockZhP,
  });

  if (roomCount > 1) {
    const row = ws.lastRow.number;
    block.rooms.slice(1).map((room) =>
      ws.addRow({
        //Уровень комнаты
        label: room.label,
        description: room.desc,
        sMain: room.sMain,
        sSecondary: room.sSecondary,
        sSummer: room.sSummer,
        sObsh: room.sObsh,
        sZhP: room.sZhP,
        //Уровень блока
        blockNum: block.blockNum,
        type: block.type,
      })
    );

    // Объединяем ячейки
    ws.mergeCells(row, 10, row + roomCount - 1, 10);
    ws.mergeCells(row, 11, row + roomCount - 1, 11);
    ws.mergeCells(row, 12, row + roomCount - 1, 12);
  }
}

function styleWorksheet(ws) {
  ws.getColumn("blockNum").hidden = true;
  ws.getColumn("type").hidden = true;
  ws.getColumn("sBlockMainSum").numFmt = '0;-0;"";@';

  ws.autoFilter = "A1:L1";

  [
    "A1",
    "B1",
    "C1",
    "D1",
    "E1",
    "F1",
    "G1",
    "H1",
    "I1",
    "J1",
    "K1",
    "L1",
  ].forEach((cell) => {
    ws.getCell(cell).style.font = { bold: true };
    ws.getCell(cell).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9D9D9" },
    };
  });

  ws.views = [{ state: "frozen", ySplit: 1 }];
  ws.addConditionalFormatting({
    ref: "A:L",
    rules: [
      {
        type: "expression",
        formulae: ['IF(AND($J1<>"", ROW() > 2),1,0)'],
        style: {
          border: {
            top: { style: "double" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      {
        type: "expression",
        formulae: ['IF($I1="main",1,0)'],
        style: {
          fill: {
            type: "pattern",
            pattern: "solid",
            bgColor: { argb: "f8fbf8" },
          },
        },
      },
      {
        type: "expression",
        formulae: ['IF($A1<>"",1,0)'],
        style: {
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
    ],
  });
}
