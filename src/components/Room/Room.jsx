import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { editRoomAction } from "../../store/roomsReducer";

export default function Room({ room }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ROOM",
    item: {
      label: room.label,
      letter: room.letter,
      num: room.num,
      type: room.sMain ? "main" : "secondary ",
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (room, monitor) => {
      const dropResult = monitor.getDropResult();
      //Все еще есть беда при попытке ресетнуть комнату с основным номером блока
      const fallbackBlock =
        room.type === "main"
          ? room.num +
            ((!!room.letter && room.letter?.[0].charCodeAt()) || 0) * 0.0001 //Номер комнаты + код буквы после запятой, чтобы иметь уникальный номер блока
          : null;
      if (room.label && dropResult) {
        dispatch(
          editRoomAction({
            label: room.label,
            blockNum:
              dropResult.type === "main" ? dropResult.blockNum : fallbackBlock,
          })
        );
        // checkBlocks();
      }
    },
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
      <div>{room.sObsh || "-"}</div>
      <div>{room.sZhP || "-"}</div>
    </div>
  );
}
