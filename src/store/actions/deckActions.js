import {
  GET_DECKS,
  ADD_DECK,
  SELECT_DECK,
  DELETE_DECK,
  ADD_QUESTION_CARD
} from "./constants";

export function onSelectDeck(payload) {
  return {
    type: SELECT_DECK,
    payload
  };
}

export function receiveDecks(decks) {
  return {
    type: GET_DECKS,
    decks
  };
}

export function addQuestionCard(title, newQuestion) {
  return {
    type: ADD_QUESTION_CARD,
    title,
    newQuestion
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title
  };
}
