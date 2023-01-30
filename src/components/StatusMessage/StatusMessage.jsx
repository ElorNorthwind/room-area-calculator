import React from "react";
import { useSelector } from "react-redux";

export default function StatusMessage() {
  const status = useSelector((state) => state.rooms.status);
  const adress = useSelector((state) => state.rooms.adress);
  const floorNumber = useSelector((state) => state.rooms.floorNumber);
  const appNumber = useSelector((state) => state.rooms.appNumber);

  switch (status) {
    case "error":
      return <h3 className="AppLabel">Ошибка чтения файла</h3>;
    case "succsess":
      return (
        <h3 className="AppLabel">{`${adress}, квартира ${appNumber} (${floorNumber} этаж)`}</h3>
      );
    default:
      return <h3 className="AppLabel">Файл не выбран</h3>;
  }
}
