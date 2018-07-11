import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Button,
  AsyncStorage,
  StyleSheet
} from "react-native";
import FlipCard from "react-native-flip-card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  receiveDecks,
  addDeck,
  onSelectDeck,
  addQuestionCard
} from "../store/actions/deckActions";
import { connect } from "react-redux";

class Test extends Component {
  state = {
    deck: "",
    question: "",
    answer: "",
    flip: false
  };

  componentWillMount() {
    AsyncStorage.getAllKeys()
      .then(keys =>
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((results, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            let deck = {
              [key]: JSON.parse(value)
            };
            return this.props.receiveDecks(deck);
          });
        })
      )
      .catch(err => console.log(err));
  }

  onAddNewDeckClick = title => {
    const newDeck = {
      title: title,
      questions: []
    };
    AsyncStorage.setItem(title, JSON.stringify(newDeck)).then(() =>
      console.log("added")
    );
    this.props.addDeck(newDeck);
    // return AsyncStorage.mergeItem("decks", JSON.stringify(newerDeck));
  };

  onDisplayDataClick = () => {
    return AsyncStorage.getItem("React").then(data => {
      return console.log(JSON.parse(data));
    });
  };

  onGetDeckClick = info => {
    AsyncStorage.getItem(info)
      .then(data => {
        data = JSON.parse(data);
        return this.props.onSelectDeck(data);
      })
      .catch(err => console.log(err));
  };

  onAddNewQuestionCardClick = (title, question, answer) => {
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
  };

  onClickDeleteDeck = title => {
    AsyncStorage.removeItem(title).catch(err => console.log(err));
  };

  render() {
    const { decks } = this.props;
    const renderItems = Object.keys(decks);
    return (
      <View style={{ backgroundColor: "#333" }}>
        <TextInput
          style={{
            height: 40,
            color: "#fff",

            borderBottomWidth: 3,
            borderBottomColor: "purple"
          }}
          placeholder="Add A New Deck"
          onChangeText={deck => this.setState({ deck })}
        />
        <TouchableOpacity
          onPress={() => this.onAddNewDeckClick(this.state.deck)}
        >
          <Text style={{ color: "#fff" }}>Click To Add A New Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onDisplayDataClick}>
          <Text style={{ color: "#fff" }}>Click to Display Data</Text>
        </TouchableOpacity>
        <FlatList
          data={renderItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onGetDeckClick(item)}>
              <Text style={{ color: "#fff" }}>{item}</Text>
              <MaterialCommunityIcons name="cards" size={30} color="purple" />
              <Text style={{ color: "#fff" }}>
                {decks[item].questions.length}{" "}
                {decks[item].questions.length > 1 ? "Cards" : "Card"}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={this.onClickDeleteData}>
          <Text style={{ color: "#fff" }}>Click to Delete Data</Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff" }}>
          {JSON.stringify(this.props.selectedDeck)}
        </Text>
        {this.props.selectedDeck.selectedDeck !== null && (
          <View style={styles.addQuestionContainer}>
            <Text>Add A New Card</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="New Question"
              onChangeText={question => this.setState({ question })}
            />
            <TextInput
              style={{ height: 40 }}
              placeholder="Answer"
              onChangeText={answer => this.setState({ answer })}
            />
            <Button
              title="Submit New Card"
              onPress={() =>
                this.onAddNewQuestionCardClick(
                  this.props.selectedDeck.selectedDeck.title,
                  this.state.question,
                  this.state.answer
                )
              }
            />
            <Button
              title="Delete Card"
              onPress={() =>
                this.onClickDeleteDeck(
                  this.props.selectedDeck.selectedDeck.title
                )
              }
            />
          </View>
        )}
        <FlipCard
          style={styles.card}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={this.state.flip}
          clickable={false}
          onFlipEnd={isFlipEnd => {
            console.log("isFlipEnd", isFlipEnd);
          }}
        >
          {/* Face Side */}
          <View style={styles.face}>
            <Text style={{ color: "white" }}>The Face</Text>
          </View>
          {/* Back Side */}
          <View style={styles.back}>
            <Text>The Back</Text>
          </View>
        </FlipCard>
        <Button
          title="Flip Card"
          onPress={() =>
            this.setState(prevState => ({ flip: !prevState.flip }))
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addQuestionContainer: {
    marginTop: 100
  },
  face: {
    height: 100,
    width: 100,
    backgroundColor: "black"
  },
  back: {
    height: 100,
    width: 100,
    backgroundColor: "purple"
  }
});

const mapStateToProps = state => ({
  decks: state.decks,
  selectedDeck: state.selectedDeck
});

export default connect(
  mapStateToProps,
  { receiveDecks, addDeck, onSelectDeck, addQuestionCard }
)(Test);
