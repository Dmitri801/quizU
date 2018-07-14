import React from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";
import { Button } from "react-native-elements";
import AwesomeButton from "react-native-really-awesome-button";
import FlipCard from "react-native-flip-card";
const QuizViews = ({
  selectedDeck,
  opacity,

  currentPage,
  questionIndex,
  answerView,
  quizOver,
  quizLength,
  toggleAnswerView,
  onCorrectAnswerClick,
  onIncorrectAnswerClick,
  correctAnswers,
  onReturnToDeckClick,
  resetQuiz
}) => {
  let resultsColor;
  if (correctAnswers / quizLength > 0.65) {
    resultsColor = "green";
  } else {
    resultsColor = "red";
  }
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ color: "#9400d3" }}>
          {!quizOver ? `Question ${currentPage} Of ${quizLength}` : "Final"}
        </Text>
      </View>
      {!quizOver ? (
        <FlipCard
          style={styles.flipper}
          friction={30}
          perspective={3000}
          flipHorizontal={true}
          flipVertical={false}
          flip={answerView}
          clickable={false}
        >
          {/* Face Side */}
          <View style={[styles.quizCard]}>
            <View>
              <Animated.View style={[styles.questionContainer, { opacity }]}>
                <Text
                  style={
                    !answerView
                      ? { color: "#fff", fontSize: 30, fontWeight: "bold" }
                      : { color: "#111" }
                  }
                >
                  {selectedDeck.questions[questionIndex].question}
                </Text>
              </Animated.View>
              <Button
                color={!answerView ? "#9400d3" : "#111"}
                transparent
                title="Answer"
                onPress={toggleAnswerView}
              />
            </View>
          </View>
          {/* Back Side */}
          <View style={[styles.quizCard]}>
            <View style={styles.answerContainer}>
              <Text
                style={
                  answerView
                    ? {
                        color: "#fff",
                        fontSize: 30,
                        fontWeight: "bold"
                      }
                    : { color: "#111" }
                }
              >
                {selectedDeck.questions[questionIndex].answer}
              </Text>
              <Button
                color={answerView ? "#9400d3" : "#111"}
                transparent
                title="Question"
                onPress={toggleAnswerView}
              />
              <View style={styles.buttonContainer}>
                <Button
                  large
                  title="Correct"
                  backgroundColor={answerView ? "green" : "#111"}
                  textStyle={
                    answerView ? { fontWeight: "bold" } : { color: "#111" }
                  }
                  onPress={onCorrectAnswerClick}
                />
                <Button
                  large
                  title="Incorrect"
                  backgroundColor={answerView ? "red" : "#111"}
                  onPress={onIncorrectAnswerClick}
                  textStyle={
                    answerView ? { fontWeight: "bold" } : { color: "#111" }
                  }
                />
              </View>
            </View>
          </View>
        </FlipCard>
      ) : (
        <View style={[styles.quizCard]}>
          <View style={styles.scoreContainer}>
            <Text
              style={{ color: resultsColor, fontSize: 30, fontWeight: "bold" }}
            >
              You got {correctAnswers} out of {quizLength} Correct.{" "}
              {correctAnswers / quizLength > 0.65 ? "😎" : "😳"}
            </Text>
            <Text
              style={{
                color: resultsColor,
                textAlign: "center",
                alignSelf: "center",
                fontWeight: "bold"
              }}
            >
              Score: {Math.round((correctAnswers / quizLength) * 100)}%
            </Text>
            <View style={styles.scoreButtons}>
              {Platform.OS === "ios" ? (
                <Button
                  large
                  raised
                  title="Deck Details"
                  fontWeight="bold"
                  backgroundColor="#fff"
                  color="#9400d3"
                  borderRadius={40}
                  onPress={onReturnToDeckClick}
                  buttonStyle={{
                    marginBottom: 10,
                    width: "100%"
                  }}
                />
              ) : (
                <AwesomeButton
                  backgroundColor="#fff"
                  backgroundShadow="#551A8B"
                  backgroundDarker="#551A8B"
                  textColor="#9400d3"
                  borderRadius={40}
                  onPress={onReturnToDeckClick}
                  textSize={16}
                >
                  Card Detail
                </AwesomeButton>
              )}
              <AwesomeButton
                backgroundColor="#9400d3"
                backgroundShadow="#551A8B"
                backgroundDarker="#551A8B"
                borderRadius={40}
                onPress={resetQuiz}
                textSize={16}
                progress
              >
                Restart Quiz
              </AwesomeButton>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quizCard: {
    flex: 1,
    maxHeight: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#111",
    borderBottomColor: "#551A8B",
    marginTop: 10,
    backfaceVisibility: "hidden",
    width: "100%",
    borderBottomWidth: 2,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "#551A8B",
    shadowOffset: { height: 0, width: 0 },
    padding: 30,
    backfaceVisibility: "hidden"
  },
  flipper: {
    borderColor: "transparent"
  },
  scoreButtons: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  answerContainer: {
    flex: 1,
    justifyContent: "center",
    backfaceVisibility: "hidden",
    alignItems: "center"
  }
});

export default QuizViews;
