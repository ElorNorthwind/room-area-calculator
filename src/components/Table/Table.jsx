import React from "react";
import { useSelector } from "react-redux";
import TableHeader from "../TableHeader/TableHeader";
import TableRow from "../TableRow/TableRow";

export default function Table() {
  const rooms = useSelector((state) => state.rooms.rooms);

  return rooms.length > 0 ? (
    <div className="Wrapper">
      <table className="explication">
        <TableHeader />
        <tbody>
          {rooms.map((item) => (
            <TableRow key={item.label} room={item} />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <></>
  );
}
