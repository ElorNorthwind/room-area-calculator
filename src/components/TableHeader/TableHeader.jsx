import React from "react";
import { useSelector } from "react-redux";

export default function TableHeader() {
  const columns = useSelector((state) => state.table.columns);

  return (
    <thead>
      <tr>
        {columns.length > 0 ? (
          columns.map((c) => <th key={c.data}>{c.text}</th>)
        ) : (
          <th>Не выбранно данных</th>
        )}
      </tr>
    </thead>
  );
}
