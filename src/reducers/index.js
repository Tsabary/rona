import { combineReducers } from "redux";
import ItemsReducer from "./ItemsReducer";
import UsersReducer from "./UsersReducer";
import PageReducer from "./PageReducer";


export default combineReducers({
  items: ItemsReducer,
  users : UsersReducer,
  page: PageReducer
});
