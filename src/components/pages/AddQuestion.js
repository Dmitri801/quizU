import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import AddQuestionForm from "../AddQuestionForm";
import { connect } from "react-redux";
import { addQuestionCard, onSelectDeck } from "../../store/actions/deckActions";
class AddQuestion extends Component {
  state = {
    questionValue: "",
    answerValue: "",
    questionError: false,
    answerError: false
  };
  static navigationOptions = () => {
    return {
      title: "Create A Card"
    };
  };
  onAddNewQuestionCardClick = (title, question, answer) => {
    if (this.state.questionValue === "") {
      this.setState({
        questionError: true
      });
    } else if (this.state.answerValue === "") {
      this.setState({
        answerError: true
      });
    } else if (
      this.state.answerValue === "" &&
      this.state.questionValue === ""
    ) {
      this.setState({
        questionError: true,
        answerError: true
      });
    } else {
      let newQuestionCard = {
        question,
        answer
      };

      AsyncStorage.getItem(title)
        .then(data => {
          data = JSON.parse(data);
          data.questions.push(newQuestionCard);
          this.props.onSelectDeck(data);
          return AsyncStorage.setItem(title, JSON.stringify(data));
        })
        .catch(err => console.log(err));
      this.props.addQuestionCard(title, newQuestionCard);
      this.props.navigation.goBack();
    }
  };

  onClickDeleteDeck = title => {
    AsyncStorage.removeItem(title).catch(err => console.log(err));
  };

  onQuestionChangeText = val => {
    this.setState({
      questionValue: val
    });
  };

  onAnswerChangeText = val => {
    this.setState({
      answerValue: val
    });
  };
  render() {
    return (
      <View style={styles.addQuestionContainer}>
        <AddQuestionForm
          questionError={this.state.questionError}
          answerError={this.state.answerError}
          questionValue={this.state.questionValue}
          answerValue={this.state.answerValue}
          onQuestionChangeText={this.onQuestionChangeText}
          onAnswerChangeText={this.onAnswerChangeText}
          onAddNewQuestionCardClick={this.onAddNewQuestionCardClick}
          selectedDeck={this.props.selectedDeck.selectedDeck}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addQuestionContainer: {
    flex: 1,
    padding: 40,
    justifyContent: "flex-start",
    backgroundColor: "#333"
  }
});

const mapStateToProps = state => ({
  decks: state.decks,
  selectedDeck: state.selectedDeck
});

export default connect(
  mapStateToProps,
  { onSelectDeck, addQuestionCard }
)(AddQuestion);
