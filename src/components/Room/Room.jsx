import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { editRoomAction } from "../../store/roomsReducer";

export default function Room({ room }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ROOM",
    item: {
      label: room.label,
      num: room.num,
      type: room.sMain ? "main" : "secondary ",
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (room, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(room.label, dropResult.blockNum);
      if (room.label && dropResult) {
        let resultNum = dropResult.blockNum;
        if (room.type === "main" && dropResult.type === "secondary") {
          resultNum = room.num;
        } else if (
          room.type === "secondary" &&
          dropResult.type === "secondary"
        ) {
          resultNum = null;
        }

        dispatch(
          editRoomAction({
            label: room.label,
            blockNum: resultNum,
          })
        );
      }
    },
  }));

  // item: { room },
  // end: (item, monitor) => {
  //   const dropResult = monitor.getDropResult();
  //   if (item.room.label && dropResult) {
  //     dispatch(
  //       editRoomAction({
  //         label: item.room.label,
  //         blockNum: dropResult.blockNum,
  //       })
  //     );
  //   }
  // },

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
