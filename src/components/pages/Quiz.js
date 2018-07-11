import React, { Component } from "react";
import { View, Animated, StyleSheet } from "react-native";
import QuizViews from "../QuizViews";
import { connect } from "react-redux";
class Quiz extends Component {
  state = {
    answerView: false,
    quizLength: this.props.selectedDeck.questions.length,
    currentPage: 1,
    questionIndex: 0,
    correctAnswers: 0,
    quizOver: false
  };
  static navigationOptions = () => {
    return {
      title: "Quiz"
    };
  };

  onCorrectAnswerClick = () => {
    if (this.state.currentPage === this.state.quizLength) {
      this.setState(prevState => ({
        correctAnswers: prevState.correctAnswers + 1,
        quizOver: true
      }));
    } else {
      this.setState(prevState => ({
        answerView: !prevState.answerView,
        currentPage: prevState.currentPage + 1,
        questionIndex: prevState.questionIndex + 1,
        correctAnswers: prevState.correctAnswers + 1
      }));
    }
  };

  onIncorrectAnswerClick = () => {
    if (this.state.currentPage === this.state.quizLength) {
      this.setState(prevState => ({
        correctAnswers: prevState.correctAnswers + 1,
        quizOver: true
      }));
    } else {
      this.setState(prevState => ({
        answerView: !prevState.answerView,
        currentPage: prevState.currentPage + 1,
        questionIndex: prevState.questionIndex + 1
      }));
    }
  };

  toggleAnswerView = () => {
    this.setState(prevState => ({
      answerView: !prevState.answerView
    }));
  };
  render() {
    return (
      <View style={styles.quizContainer}>
        <QuizViews
          onIncorrectAnswerClick={this.onIncorrectAnswerClick}
          onCorrectAnswerClick={this.onCorrectAnswerClick}
          correctAnswers={this.state.correctAnswers}
          quizLength={this.state.quizLength}
          toggleAnswerView={this.toggleAnswerView}
          answerView={this.state.answerView}
          quizOver={this.state.quizOver}
          selectedDeck={this.props.selectedDeck}
          currentPage={this.state.currentPage}
          questionIndex={this.state.questionIndex}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333"
  }
});

const mapStateToProps = state => ({
  selectedDeck: state.selectedDeck.selectedDeck
});

export default connect(mapStateToProps)(Quiz);
