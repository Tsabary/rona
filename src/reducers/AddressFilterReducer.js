import { CHANGE_ADDRESS } from "../actions/types";

export default (
  state = { text: "Dizzengoff Center", coords: [31.832768, 34.826944] },
  action
) => {
  switch (action.type) {
    case CHANGE_ADDRESS:
      return action.payload;

    default:
      return state;
  }
};
