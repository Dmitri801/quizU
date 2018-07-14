import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { receiveDecks, onSelectDeck } from "../../store/actions/deckActions";
import { Header } from "react-native-elements";
import LandingView from "../LandingView";
import DeckList from "../DeckList";

class HomeScreen extends Component {
  state = {
    btnLoading: true
  };
  componentWillMount() {
    AsyncStorage.getAllKeys()
      .then(keys => {
        let newKeys = keys.filter(key => key !== "QuizUbyDMI:notifications");
        return AsyncStorage.multiGet(newKeys, (err, stores) => {
          stores.map((results, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            let deck = {
              [key]: JSON.parse(value)
            };
            return this.props.receiveDecks(deck);
          });
        });
      })
      .catch(err => console.log(err));
  }

  navigateToAddDeck = next => {
    setTimeout(() => {
      next();
    }, 500);
    setTimeout(() => {
      this.props.navigation.navigate("AddDeck");
    }, 700);
  };

  navigateToDeck = title => {
    this.props.navigation.navigate("DeckDetail", {
      title
    });
    AsyncStorage.getItem(title)
      .then(data => {
        data = JSON.parse(data);
        return this.props.onSelectDeck(data);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.homeContainer}>
        {Object.keys(decks).length === 0 && decks.constructor === Object ? (
          <LandingView
            navigateToAddDeck={this.navigateToAddDeck}
            btnLoading={this.state.btnLoading}
          />
        ) : (
          <DeckList
            decks={this.props.decks}
            navigateToDeck={this.navigateToDeck}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333"
  }
});

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(
  mapStateToProps,
  { receiveDecks, onSelectDeck }
)(HomeScreen);
