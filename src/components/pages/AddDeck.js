import React, { Component } from "react";
import AddDeckForm from "../AddDeckForm";
import { View, AsyncStorage, StyleSheet } from "react-native";
import { addDeck } from "../../store/actions/deckActions";
import { connect } from "react-redux";

class AddDeck extends Component {
  state = {
    deckValue: "",
    error: false
  };
  navigateHome = () => {
    this.props.navigation.navigate("Home");
  };
  onAddNewDeckClick = title => {
    if (this.state.deckValue === "") {
      this.setState({
        error: true
      });
    } else {
      const newDeck = {
        title: title,
        questions: []
      };
      AsyncStorage.setItem(title, JSON.stringify(newDeck)).catch(err =>
        console.log(err)
      );
      this.props.addDeck(newDeck);
      this.setState({ deckValue: "", error: false });
      this.navigateHome();
    }
  };

  onAddDeckChangeText = val => {
    this.setState({
      deckValue: val
    });
  };
  render() {
    return (
      <View style={styles.addDeckContainer}>
        <AddDeckForm
          deckValue={this.state.deckValue}
          error={this.state.error}
          onAddNewDeckClick={this.onAddNewDeckClick}
          onChangeText={this.onAddDeckChangeText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addDeckContainer: {
    flex: 1,

    padding: 20,
    justifyContent: "center",
    backgroundColor: "#333"
  }
});

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(
  mapStateToProps,
  { addDeck }
)(AddDeck);
