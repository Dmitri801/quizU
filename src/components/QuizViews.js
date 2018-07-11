import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Button } from "react-native-elements";
import FlipCard from "react-native-flip-card";
const QuizViews = ({
  selectedDeck,
  currentPage,
  questionIndex,
  answerView,
  quizOver,
  quizLength,
  toggleAnswerView,
  onCorrectAnswerClick,
  onIncorrectAnswerClick,
  correctAnswers
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ color: "#9400d3" }}>
          Question {currentPage} of {quizLength}
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
          onFlipEnd={isFlipEnd => {
            console.log("isFlipEnd", isFlipEnd);
          }}
        >
          {/* Face Side */}
          <View style={[styles.quizCard]}>
            <View style={styles.questionContainer}>
              <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
                {selectedDeck.questions[questionIndex].question}
              </Text>
              <Button
                color="#9400d3"
                transparent
                title="Answer"
                onPress={toggleAnswerView}
              />
            </View>
          </View>
          {/* Back Side */}
          <View style={[styles.quizCard]}>
            <View style={styles.questionContainer}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: "bold"
                }}
              >
                {selectedDeck.questions[questionIndex].answer}
              </Text>
              <Button
                color="#9400d3"
                transparent
                title="Question"
                onPress={toggleAnswerView}
              />
              <View style={styles.buttonContainer}>
                <Button
                  large
                  title="Correct"
                  backgroundColor="green"
                  textStyle={{ fontWeight: "bold" }}
                  onPress={onCorrectAnswerClick}
                />
                <Button
                  large
                  title="Incorrect"
                  backgroundColor="red"
                  onPress={onIncorrectAnswerClick}
                  textStyle={{ fontWeight: "bold" }}
                />
              </View>
            </View>
          </View>
        </FlipCard>
      ) : (
        <View style={[styles.quizCard]}>
          <View style={styles.scoreContainer}>
            <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
              You got {correctAnswers} out of {quizLength} Correct.
            </Text>
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
  questionContainer: {},
  scoreContainer: {},
  buttonContainer: {
    justifyContent: "space-evenly"
  }
});

export default QuizViews;
