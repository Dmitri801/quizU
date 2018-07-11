import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

class AddDeckForm extends Component {
  render() {
    return (
      <View style={styles.formCard}>
        <FormLabel>Enter The Title For A New Deck</FormLabel>
        <FormInput
          containerStyle={{ flexWrap: "wrap" }}
          multiline
          placeholder="New Deck Title"
          placeholderTextColor="#777"
          style={{ color: "#fff" }}
          selectionColor="#9400d3"
          value={this.props.deckValue}
          onChangeText={this.props.onChangeText}
          inputStyle={{
            color: "white",
            fontWeight: "bold",
            width: 250
          }}
        />
        {this.props.error && (
          <FormValidationMessage>A New Deck Is Required</FormValidationMessage>
        )}
        <Button
          icon={{ name: "create" }}
          backgroundColor="#9400d3"
          buttonStyle={{
            marginTop: 30,
            width: "100%",
            padding: 10,
            borderRadius: 20,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          onPress={() => this.props.onAddNewDeckClick(this.props.deckValue)}
          title="CREATE DECK"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formCard: {
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    borderBottomColor: "#551A8B",
    marginTop: 10,
    height: 300,
    width: "100%",
    borderBottomWidth: 2,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "#551A8B",
    shadowOffset: { height: 0, width: 0 },
    padding: 30
  }
});

export default AddDeckForm;
