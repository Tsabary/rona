import { FETCH_GROUP, FETCH_SINGLE } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_GROUP:
      return action.payload;

    case FETCH_SINGLE:
      return [...state, action.payload];

    default:
      return state;
  }
};
