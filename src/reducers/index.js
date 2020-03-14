import { combineReducers } from "redux";
import ItemsReducer from "./ItemsReducer";
import UsersReducer from "./UsersReducer";
import PageReducer from "./PageReducer";
import PositionsReducer from "./PositionsReducer";


export default combineReducers({
  items: ItemsReducer,
  users : UsersReducer,
  page: PageReducer,
  positions: PositionsReducer

});
