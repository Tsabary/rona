import { CHANGE_ADDRESS } from "../actions/types";

export default (
  state = { text: "Dizengoff Center", coords: [32.075138, 34.775021] },
  action
) => {
  switch (action.type) {
    case CHANGE_ADDRESS:
      return action.payload;

    default:
      return state;
  }
};
