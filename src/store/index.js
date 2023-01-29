import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { roomsReducer } from "./roomsReducer";
import { tableReducer } from "./tableReducer";
import { uiReducer } from "./uiReducer";

const rootReducer = combineReducers({
  rooms: roomsReducer,
  table: tableReducer,
  ui: uiReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
