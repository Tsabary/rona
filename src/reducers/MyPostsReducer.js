import { FETCH_MY_POSTS, DELETE_POST } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_MY_POSTS:
      return action.payload;

    case DELETE_POST:
      return state.filter(post => post.id !== action.payload);

    default:
      return state;
  }
};
