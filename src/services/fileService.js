import { setRoomsStatusAction } from "../store/roomsReducer";

export function readFile(file, dispatch) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    };
    reader.onerror = () => {
      dispatch(setRoomsStatusAction("error"));
      rej(reader.statusText);
    };
    reader.readAsArrayBuffer(file);
  });
}
