import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class DeckList extends Component {
  render() {
    const { decks, navigateToDeck } = this.props;
    const deckKeys = Object.keys(decks);
    const availableDecks = (
      <FlatList
        data={deckKeys}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.decks]}
            key={index}
            onPress={() => navigateToDeck(item)}
          >
            <Text style={styles.headline}>{item}</Text>
            <MaterialCommunityIcons
              name="cards"
              size={30}
              color="#9400d3"
              style={styles.icon}
            />
            <Text style={styles.subHeadline}>
              {decks[item].questions.length > 0
                ? decks[item].questions.length
                : " "}
              {decks[item].questions.length < 1
                ? " No Cards Yet.."
                : decks[item].questions.length > 1
                  ? " Cards"
                  : " Card"}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
    return <View style={styles.deckContainer}>{availableDecks}</View>;
  }
}

export default DeckList;

const styles = StyleSheet.create({
  decks: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    borderBottomColor: "#eee",
    marginTop: 10,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomWidth: 2,
    shadowOpacity: 0.55,
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
    padding: 30
  },
  icon: {
    padding: 10
  },
  subHeadline: {
    padding: 10,
    color: "#fff",
    fontSize: 20
  },
  headline: {
    fontSize: 35,
    color: "#fff"
  }
});
