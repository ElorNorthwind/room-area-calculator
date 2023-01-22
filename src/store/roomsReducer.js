const defaultState = {
  rooms: [],
  status: "Файл не выбран",
};

export const ADD_ROOMS = "ADD_ROOMS";
export const EDIT_ROOM = "EDIT_ROOM";
export const SET_ROOMS_STATUS = "SET_ROOMS_STATUS";

export const roomsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ROOMS:
      return { ...state, rooms: [...action.payload] };
    case EDIT_ROOM:
      return {
        ...state,
        rooms: [
          ...state.rooms.map((room) =>
            room.label === action.payload.label
              ? {
                  ...room,
                  label: action.payload.label,
                  block: action.payload.block,
                }
              : room
          ),
        ],
      };
    case SET_ROOMS_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const addRoomsAction = (payload) => ({ type: ADD_ROOMS, payload });
export const editRoomAction = (payload) => ({ type: EDIT_ROOM, payload });
export const setRoomsStatusAction = (payload) => ({
  type: SET_ROOMS_STATUS,
  payload,
});
