import { combineReducers } from "redux";
import ItemsReducer from "./ItemsReducer";
import UsersReducer from "./UsersReducer";


export default combineReducers({
  items: ItemsReducer,
  users : UsersReducer
});
