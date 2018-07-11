import { AsyncStorage } from "react-native";
import { decks } from "./data";

export function saveData() {
  return AsyncStorage.setItem("decks", JSON.stringify(decks));
}

export async function getDecks() {
  try {
    let storedDecks = await AsyncStorage.getItem("decks");
    if (storedDecks !== null) {
      let parsedDecks = JSON.parse(storedDecks);
      alert(parsedDecks.React.questions[0].question);
    }
  } catch (err) {
    alert(err);
  }
}
