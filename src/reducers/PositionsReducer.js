import { FETCH_POSITIONS, FETCH_SINGLE_POSITION } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSITIONS:
      return action.payload;

    case FETCH_SINGLE_POSITION:
      return [...state, action.payload];

    default:
      return state;
  }
};
