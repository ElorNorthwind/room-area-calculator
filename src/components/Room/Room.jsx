import { useDrag } from "react-dnd";

export default function Room({ room }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ROOM",
    roomLabel: room.label,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`room room__${!!room.sMain ? "main" : "secondary"}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      ref={drag}
    >
      <div>{room.label}</div>
      <div>{room.desc}</div>
      <div>{room.sMain || "-"}</div>
      <div>{room.sSecondary || "-"}</div>
      <div>{room.sSummer || "-"}</div>
    </div>
  );
}
