import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { editRoomAction } from "../../store/roomsReducer";

export default function Room({ room }) {
  const dispatch = useDispatch();

  // const rooms = useSelector((state) => state.rooms.rooms);

  // //Check for blocks with no main area
  // function checkBlocks() {
  //   roomsToBlocks(rooms).forEach(function (block) {
  //     if (!block.sBlockMainSum) {
  //       block.rooms.forEach((room) =>
  //         dispatch(
  //           editRoomAction({
  //             label: room.label,
  //             blockNum: null,
  //           })
  //         )
  //       );
  //     }
  //   });
  // }

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
      const fallbackBlock = room.type === "main" ? room.num : null;
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
