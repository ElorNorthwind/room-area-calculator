// import Excel from "exceljs";

// export async function parseXmls(file) {
//   const reader = new FileReader();
//   const wb = new Excel.Workbook();
//   let results = { rooms: [], adress: null };
//   reader.readAsArrayBuffer(file);
//   reader.onload = () => {
//     const buffer = reader.result;
//     wb.xlsx
//       .load(buffer)
//       .then((workbook) => {
//         const ws = workbook.getWorksheet(1);
//         const floorNumber = ws.getRow(12).getCell(1).value;
//         const adress = ws.getRow(4).getCell(3).value;
//         const arr = [];
//         ws.eachRow(function (row) {
//           const r = row.values;
//           if (r[1] === floorNumber) {
//             arr.push(parseRow(r));
//           }
//         });
//         results = { rooms: arr.sort((a, b) => a.label - b.label), adress };
//         return;
//       })
//       .catch(console.log("error"));
//   };
//   return results;
// }

export function parseRow(rowArr) {
  const regex = /(\d+)([а-я])?/gi;
  const results = regex.exec(rowArr[2]);

  return {
    num: Number(results[1] || null),
    letter: results[2] || null,
    label: rowArr[2],
    desc: rowArr[5],
    main: parseArea(rowArr[9]),
    secondary: parseArea(rowArr[10]),
    summer:
      parseArea(rowArr[11]) + parseArea(rowArr[12]) + parseArea(rowArr[13]),
  };
}

function parseArea(area) {
  return Number((area || "0").replace(",", "."));
}
