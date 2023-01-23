import React from "react";
import Room from "../Room/Room";

export default function RoomList({ rooms }) {
  return (
    <div className="rooms_list">
      {rooms.map((room) => (
        <Room room={room} key={room.label} />
      ))}
    </div>
  );
}
