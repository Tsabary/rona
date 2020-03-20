import { FETCH_POSTS, FETCH_SINGLE, DELETE_POST } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;

    case FETCH_SINGLE:
      return [...state, action.payload];

    case DELETE_POST:
      return state.filter(post => post.id !== action.payload);

    default:
      return state;
  }
};
