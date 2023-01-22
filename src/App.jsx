import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./components/Table/Table";
import { readAndParseXmls } from "./services";
import { addRoomsAction, setRoomsStatusAction } from "./store/roomsReducer";

function App() {
  const dispatch = useDispatch();
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
      <Table />
    </div>
  );
}

export default App;
