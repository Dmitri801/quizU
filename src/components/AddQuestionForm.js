import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

const AddQuestionForm = ({
  answerValue,
  questionValue,
  onAnswerChangeText,
  onQuestionChangeText,
  questionError,
  answerError,
  onAddNewQuestionCardClick,
  selectedDeck
}) => {
  return (
    <View style={styles.formCard}>
      <FormLabel>New Question</FormLabel>
      <FormInput
        multiline
        containerStyle={{ padding: 10, marginBottom: 10 }}
        placeholder="Question"
        placeholderTextColor="#777"
        style={{ color: "#fff" }}
        selectionColor="#9400d3"
        value={questionValue}
        onChangeText={onQuestionChangeText}
        inputStyle={{ color: "white", fontWeight: "bold", width: 250 }}
      />
      {questionError && (
        <FormValidationMessage>A Question Is Required</FormValidationMessage>
      )}
      <FormInput
        multiline
        containerStyle={{ padding: 10 }}
        placeholder="Answer"
        placeholderTextColor="#777"
        style={{ color: "#fff" }}
        selectionColor="#9400d3"
        value={answerValue}
        onChangeText={onAnswerChangeText}
        inputStyle={{ color: "white", fontWeight: "bold", width: 250 }}
      />
      {answerError && (
        <FormValidationMessage>An Answer Is Required</FormValidationMessage>
      )}
      <Button
        backgroundColor="#9400d3"
        fontWeight="bold"
        outline
        buttonStyle={{
          borderColor: "#9400d3",

          marginTop: 200,
          width: "100%",
          padding: 10,
          borderRadius: 20,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
        }}
        onPress={() =>
          onAddNewQuestionCardClick(
            selectedDeck.title,
            questionValue,
            answerValue
          )
        }
        title="ADD TO DECK"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    flex: 1,
    maxHeight: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
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

export default AddQuestionForm;
