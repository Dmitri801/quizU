import React from "react";
import HomeScreen from "./src/components/pages/Home";
import Quiz from "./src/components/pages/Quiz";
import AddDeck from "./src/components/pages/AddDeck";
import AddQuestion from "./src/components/pages/AddQuestion";
import DeckDetail from "./src/components/pages/DeckDetail";
import Test from "./src/components/Test";
import { saveData } from "./utils/api";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { Constants } from "expo";
import store from "./src/store/store";

const StudyHardyStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const Tabs = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarOptions: {
        labelStyle: {
          fontSize: 13
        },
        activeTintColor: "#fff",
        style: {
          backgroundColor: "#111"
        }
      },

      tabBarLabel: "Home",
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons name="ios-home" size={30} color={tintColor} marginTop={40} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: "#fff",
        labelStyle: {
          fontSize: 13
        },
        style: {
          backgroundColor: "#111"
        }
      },
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  },
  Test: {
    screen: Test,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: "#fff",
        labelStyle: {
          fontSize: 13
        },
        style: {
          backgroundColor: "#111"
        }
      },
      tabBarLabel: "Test",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="info" size={30} color={tintColor} />
      )
    }
  }
});

const LeadNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#000"
      },
      title: "QuizU",
      headerTitleStyle: {
        color: "#551A8B",
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic"
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#000"
      }
    }
  },
  NewQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#000"
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#000"
      }
    }
  }
});
export default class App extends React.Component {
  render() {
    console.ignoredYellowBox = ["Remote debugger"];
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StudyHardyStatusBar
            backgroundColor="black"
            barStyle="light-content"
          />
          <LeadNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
