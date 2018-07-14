import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

const LandingView = ({ navigateToAddDeck, btnLoading }) => {
  return (
    <View style={styles.landingContainer}>
      <Text style={styles.headerText}>
        Welcome to <Text style={{ color: "#551A8B" }}>QuizU</Text>, create a
        deck to get started 🙌
      </Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AwesomeButton
          backgroundColor="#9400d3"
          backgroundShadow="#551A8B"
          backgroundDarker="#551A8B"
          onPress={navigateToAddDeck}
          textSize={20}
          progress
        >
          Create A Deck
        </AwesomeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30
  }
});

export default LandingView;
