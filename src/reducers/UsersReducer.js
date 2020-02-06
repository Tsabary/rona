import { FETCH_USERS, FETCH_SINGLE_USER } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;

    case FETCH_SINGLE_USER:
      return [...state, action.payload];

    default:
      return state;
  }
};
