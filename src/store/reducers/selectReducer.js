import { SELECT_DECK, GET_DECKS } from "../actions/constants";

const initialState = {
  selectedDeck: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_DECK:
      return {
        ...state,
        selectedDeck: action.payload
      };
    case GET_DECKS:
      return {
        ...state,
        selectedDeck: null
      };
    default:
      return state;
  }
}
