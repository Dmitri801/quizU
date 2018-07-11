import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { deleteDeck } from "../../store/actions/deckActions";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-elements";
class DeckDetail extends Component {
  state = {
    showAlert: false
  };
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title: title.toUpperCase()
    };
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  onClickDeleteDeck = title => {
    AsyncStorage.removeItem(title).catch(err => console.log(err));
    this.props.deleteDeck(title);
    this.props.navigation.goBack();
  };
  render() {
    const { showAlert } = this.state;
    const { selectedDeck } = this.props.selectedDeck;
    let deckCards;
    if (!selectedDeck) {
      deckCards = "Loading..";
    } else if (selectedDeck.questions.length < 1) {
      deckCards =
        "You Haven't Added Any Questions Yet.. Click Below To Add A Question Card To This Deck";
    } else if (selectedDeck.questions.length === 1) {
      deckCards = `There Is ${
        selectedDeck.questions.length
      } Card In This Deck Currently, Click Below To Start The Quiz, Or Add A New Card`;
    } else {
      deckCards = `There Are ${
        selectedDeck.questions.length
      } Cards In This Deck Currently, Click Below To Start The Quiz, Or Add A New Card`;
    }

    return (
      <View style={styles.deckDetailContainer}>
        <View style={styles.deckDetailHeader}>
          <Text style={styles.headerText}>
            What Do You Know About{" "}
            <Text
              style={{
                color: "#9400d3",
                letterSpacing: 0.2
              }}
            >
              {selectedDeck && selectedDeck.title.toUpperCase()}
            </Text>?
          </Text>
        </View>
        <View style={styles.deckCardDetail}>
          <Feather color="#9400d3" name="info" size={30} />
          <Text style={{ color: "#fff", fontWeight: "bold", margin: 10 }}>
            {deckCards}
          </Text>
        </View>
        <View style={styles.deckCardButtons}>
          <Button
            large
            raised
            title="Add A New Card"
            fontWeight="bold"
            backgroundColor="#fff"
            color="#000"
            borderRadius={40}
            onPress={() =>
              this.props.navigation.navigate("NewQuestion", {
                title: selectedDeck.title
              })
            }
            buttonStyle={{
              marginBottom: 10,
              width: "100%"
            }}
          />
          <Button
            large
            raised
            title="Start Quiz"
            onPress={() => this.props.navigation.navigate("Quiz")}
            backgroundColor="transparent"
            borderRadius={40}
            fontWeight="bold"
            outline
            loading={!selectedDeck || selectedDeck.questions.length < 1}
            disabled={!selectedDeck || selectedDeck.questions.length < 1}
            textStyle={
              !selectedDeck || selectedDeck.questions.length < 1
                ? { color: "#9400d3" }
                : {
                    fontSize: 40,
                    textShadowColor: "#9400d3",
                    textShadowRadius: 100
                  }
            }
            disabledStyle={{ backgroundColor: "#9400d3" }}
            activityIndicatorStyle={{ backgroundColor: "black" }}
            buttonStyle={{
              borderColor: "#9400d3",
              width: "100%"
            }}
          />
        </View>
        <View style={styles.deckCardDeleteButton}>
          <Button
            raised
            title="Delete Deck"
            fontWeight="bold"
            backgroundColor="red"
            icon={{ name: "ios-trash", type: "ionicon" }}
            color="#fff"
            onPress={() => this.showAlert()}
          />
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="This CANNOT be reversed"
          message="Are you sure you want to delete the deck?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
            this.onClickDeleteDeck(selectedDeck.title);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckDetailContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#333"
  },
  deckDetailHeader: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  deckCardDetail: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#111",
    maxHeight: 130,
    justifyContent: "flex-start",

    borderBottomColor: "#551A8B",
    borderBottomWidth: 2,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowColor: "#551A8B",
    shadowOffset: { height: 0, width: 0 }
  },
  deckCardButtons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  deckCardDeleteButton: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10
  }
});

const mapStateToProps = state => ({
  selectedDeck: state.selectedDeck
});

export default connect(
  mapStateToProps,
  { deleteDeck }
)(DeckDetail);
