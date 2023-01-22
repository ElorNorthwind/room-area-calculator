const defaultState = {
  columns: [
    { data: "label", text: "№", spawned: false },
    { data: "desc", text: "описание", spawned: false },
    { data: "formated.sMain", text: "жилая", spawned: false },
    { data: "formated.sSecondary", text: "вспом.", spawned: false },
    { data: "formated.sSummer", text: "летняя", spawned: false },
    { data: "blockNum", text: "блок", spawned: false },
    { data: "formated.sBlockMainSum", text: "S жил.", spawned: true },
    { data: "formated.sBlockObsh", text: "S общ.", spawned: true },
    { data: "formated.sBlockZhP", text: "S ж.п.", spawned: true },
  ],
};

export const SET_COLUMNS = "SET_COLUMNS";

export const tableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_COLUMNS:
      return { ...state, table: [...action.payload] };
    default:
      return state;
  }
};

export const setColumnsAction = (payload) => ({ type: SET_COLUMNS, payload });
