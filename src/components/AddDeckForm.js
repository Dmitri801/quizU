import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import AwesomeButton from "react-native-really-awesome-button";
class AddDeckForm extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formCard}>
          <FormLabel>Enter The Title For A New Deck</FormLabel>
          <FormInput
            containerStyle={{ flexWrap: "wrap" }}
            placeholder="New Deck Title"
            placeholderTextColor="#777"
            style={{ color: "#fff" }}
            selectionColor="#9400d3"
            returnKeyType="done"
            underlineColorAndroid="#551A8B"
            keyboardAppearance="dark"
            value={this.props.deckValue}
            onChangeText={this.props.onChangeText}
            inputStyle={{
              color: "white",
              fontWeight: "bold",
              width: 250
            }}
          />
          {this.props.error && (
            <FormValidationMessage>
              A New Deck Is Required
            </FormValidationMessage>
          )}
          {Platform.OS === "ios" ? (
            <Button
              icon={{ name: "create" }}
              backgroundColor="#9400d3"
              fontWeight="bold"
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
          ) : (
            <AwesomeButton
              backgroundColor="#9400d3"
              backgroundShadow="#551A8B"
              backgroundDarker="#551A8B"
              borderRadius={40}
              onPress={() => this.props.onAddNewDeckClick(this.props.deckValue)}
              textSize={16}
            >
              Add Deck
            </AwesomeButton>
          )}
        </View>
      </TouchableWithoutFeedback>
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
