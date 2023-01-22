import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAndParseXmls } from "./services";
import { addRoomsAction, setRoomsStatusAction } from "./store/roomsReducer";

function App() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const status = useSelector((state) => state.rooms.status);
  const fileInputRef = useRef();

  async function parseXmls() {
    const results = await readAndParseXmls(fileInputRef.current.files[0]);

    dispatch(addRoomsAction(results.rooms));
    dispatch(setRoomsStatusAction(results.adress));
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
                <td>{item.formated.sMain}</td>
                <td>{item.formated.sSecondary}</td>
                <td>{item.formated.sSummer}</td>
                <td>{item.blockNum}</td>

                {item.rowSpawn > 0 && (
                  <>
                    <td rowSpan={Number(item.rowSpawn)}>
                      {item.formated.sBlockMainSum}
                    </td>
                    <td rowSpan={Number(item.rowSpawn)}>
                      {item.formated.sBlockObsh}
                    </td>
                    <td rowSpan={Number(item.rowSpawn)}>
                      {item.formated.sBlockZhP}
                    </td>
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
