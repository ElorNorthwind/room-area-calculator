import Excel from "exceljs";

export async function readWorksheet(buffer) {
  try {
    const wb = new Excel.Workbook();
    const workbook = await wb.xlsx.load(buffer);
    return workbook.getWorksheet(1);
  } catch (e) {
    console.log(e);
  }
}
