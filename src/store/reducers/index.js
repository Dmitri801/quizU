import {
  GET_DECKS,
  ADD_DECK,
  ADD_QUESTION_CARD,
  DELETE_DECK
} from "../actions/constants";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: Object.assign({}, action.deck)
      };
    case ADD_QUESTION_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.newQuestion]
        }
      };
    case DELETE_DECK:
      let newState = Object.assign({}, state);
      newState = Object.keys(newState)
        .filter(key => key !== action.title)
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
      return {
        ...newState
      };
    default:
      return state;
  }
}
