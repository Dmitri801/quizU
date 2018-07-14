import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  Image,
  StyleSheet
} from "react-native";

import {
  receiveDecks,
  addDeck,
  onSelectDeck,
  addQuestionCard
} from "../store/actions/deckActions";
import { connect } from "react-redux";

class Test extends Component {
  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    const { opacity } = this.state;

    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start();
  }

  render() {
    const { opacity } = this.state;
    return (
      <View style={{ backgroundColor: "#333", flex: 1 }}>
        <TouchableOpacity>
          <Text style={{ color: "#fff" }}>Click To Add A New Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#fff" }}>Click to Display Data</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <Animated.Image
            style={[styles.img, { opacity }]}
            source={{
              uri:
                "https://images.pexels.com/photos/1210530/pexels-photo-1210530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addQuestionContainer: {
    marginTop: 100
  },
  img: {
    height: 200,
    width: 200
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
