import { combineReducers } from "redux";
import PostsReducer from "./PostsReducer";
import PageReducer from "./PageReducer";
import MyPostsReducer from "./MyPostsReducer";
import PopupReducer from "./PopupReducer"

export default combineReducers({
  posts: PostsReducer,
  myPosts : MyPostsReducer,
  page: PageReducer,
  popupShown: PopupReducer
});
