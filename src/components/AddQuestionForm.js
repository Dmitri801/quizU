import React from "react";
import { View, Text, Platform, Dimensions } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import AwesomeButton from "react-native-really-awesome-button";
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
    <View style={formCard}>
      <FormLabel>New Question</FormLabel>
      <FormInput
        containerStyle={{ padding: 10, marginBottom: 10 }}
        placeholder="Question"
        placeholderTextColor="#777"
        style={{ color: "#fff" }}
        selectionColor="#9400d3"
        value={questionValue}
        onChangeText={onQuestionChangeText}
        inputStyle={inputStyle}
      />
      {questionError && (
        <FormValidationMessage>A Question Is Required</FormValidationMessage>
      )}
      <FormInput
        containerStyle={{ padding: 10 }}
        placeholder="Answer"
        placeholderTextColor="#777"
        style={{ color: "#fff" }}
        selectionColor="#9400d3"
        value={answerValue}
        onChangeText={onAnswerChangeText}
        inputStyle={inputStyle}
      />
      {answerError && (
        <View
          style={{
            justifyContent: "flex-end",
            marginTop: Platform.OS === "ios" ? 20 : null
          }}
        >
          <FormValidationMessage>An Answer Is Required</FormValidationMessage>
        </View>
      )}
      {Platform.OS === "ios" ? (
        <Button
          icon={{ name: "create" }}
          backgroundColor="#9400d3"
          fontWeight="bold"
          textStyle={{ color: "#fff" }}
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
      ) : (
        <AwesomeButton
          backgroundColor="#9400d3"
          backgroundShadow="#551A8B"
          backgroundDarker="#551A8B"
          onPress={() =>
            onAddNewQuestionCardClick(
              selectedDeck.title,
              questionValue,
              answerValue
            )
          }
          textSize={20}
        >
          Create Card
        </AwesomeButton>
      )}
    </View>
  );
};

const formCard = {
  flex: 1,
  maxHeight: Dimensions.get("window").width <= 320 ? 500 : "80%",
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
};
const inputStyle = {
  color: "white",
  fontWeight: "bold",
  width: Dimensions.get("window").width <= 320 ? 150 : 250
};

// const responsiveInputStyle = createStyles(
//   inputStyle,
//   maxWidth(320, {
//     inputStyle: {
//       color: "white",
//       fontWeight: "bold",
//       width: 100
//     }
//   })
// );

export default AddQuestionForm;
