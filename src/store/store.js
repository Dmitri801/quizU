import { createStore, combineReducers, compose } from "redux";
import selectReducer from "./reducers/selectReducer";
import deckReducer from "./reducers";

const rootReducer = combineReducers({
  decks: deckReducer,
  selectedDeck: selectReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(rootReducer, composeEnhancers());

export default store;
