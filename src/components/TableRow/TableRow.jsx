import React from "react";
import { useSelector } from "react-redux";

export default function TableRow({ room }) {
  const columns = useSelector((state) => state.table.columns);

  const column = (c) => {
    const dataArr = c.data.split(".", 2);
    const span = c.spawned ? room.rowSpawn : 1;

    return dataArr.length > 1
      ? span > 0 && (
          <td key={c.data} rowSpan={span}>
            {room[dataArr[0]][dataArr[1]]}
          </td>
        )
      : span > 0 && (
          <td key={c.data} rowSpan={span}>
            {room[c.data]}
          </td>
        );
  };

  return (
    <tr key={room.label} className={room.rowStyle}>
      {columns.length > 0 ? (
        columns.map((c) => column(c))
      ) : (
        <td>Не выбранно данных</td>
      )}
    </tr>
  );
}
