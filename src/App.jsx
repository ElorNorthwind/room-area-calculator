import Excel from "exceljs";
import { useRef, useState } from "react";
import { prepareData } from "./utils/calculateData";
import { parseRow } from "./utils/parseWorksheet";

function App() {
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("Выберете файл экспликации");
  const fileInputRef = useRef();

  function sortRooms(a, b) {
    if (a.num === b.num) {
      return a.letter < b.letter ? -1 : 1;
    } else {
      return a.num < b.num ? -1 : 1;
    }
  }

  async function parseXmls() {
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();
    const wb = new Excel.Workbook();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx
        .load(buffer)
        .then((workbook) => {
          const ws = workbook.getWorksheet(1);
          const floorNumber = ws.getRow(12).getCell(1).value;
          const adress = ws.getRow(4).getCell(3).value;
          const arr = [];
          ws.eachRow(function (row) {
            const r = row.values;
            if (r[1] === floorNumber) {
              arr.push(parseRow(r));
            }
          });
          console.log(arr);
          setRooms(prepareData(arr.sort(sortRooms)));
          setStatus(adress);
        })
        .catch(setStatus("Некорректный файл"));
    };
  }

  return (
    <div className="App">
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx"
        onChange={() => parseXmls()}
      />
      <h3>{status}</h3>
      {rooms.length > 0 ? (
        <table className="explication">
          <thead>
            <tr>
              <th>№</th>
              <th>описание</th>
              <th>жилая</th>
              <th>вспом.</th>
              <th>летняя</th>
              <th>блок</th>
              <th>S жил.</th>
              <th>S общ.</th>
              <th>S ж.п.</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((item) => (
              <tr key={item.label} className={item.rowStyle}>
                <td>{item.label}</td>
                <td>{item.desc}</td>
                <td>{item.main}</td>
                <td>{item.secondary}</td>
                <td>{item.summer}</td>
                <td>{item.block}</td>

                {item.rowSpawn > 0 && (
                  <>
                    <td rowSpan={Number(item.rowSpawn)}>
                      {Math.round(item.areaLiving * 10) / 10}
                    </td>
                    <td rowSpan={Number(item.rowSpawn)}>0</td>
                    <td rowSpan={Number(item.rowSpawn)}>0</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Не выбрано комнат</div>
      )}
    </div>
  );
}

export default App;
