const defaultState = {
  modalActive: false,
  modalBlockNum: null,
  modalArea: "obsh",
};

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SET_MODAL_BLOCK = "SET_MODAL_BLOCK";
export const SET_MODAL_AREA = "SET_MODAL_AREA";

export const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, modalActive: !state.modalActive };
    case SET_MODAL_BLOCK:
      return { ...state, modalBlockNum: action.payload };
    case SET_MODAL_AREA:
      return { ...state, modalArea: action.payload };
    default:
      return state;
  }
};

export const toggleModal = (payload) => ({ type: TOGGLE_MODAL, payload });
export const setModalBlock = (payload) => ({ type: SET_MODAL_BLOCK, payload });
export const setModalArea = (payload) => ({ type: SET_MODAL_AREA, payload });
