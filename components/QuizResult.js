import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import {Button} from "native-base"
import { saveResettedDeck } from "../utils/api";
import { resetDeck } from "../actions";
import { useNavigation } from '@react-navigation/native';


function QuizResult({ item, deckId, dispatch }) {
  const navigation = useNavigation();
  const deck = item[deckId];
  const questionsArray = Object.values(deck.questions);
  const cardCount = questionsArray.length;
  const correctCount = questionsArray.filter(question => question.correct)
    .length;

  console.log(questionsArray);
  const handleRestart = () => {
    saveResettedDeck(deckId).then(() => {
      dispatch(resetDeck(deckId));
    });
  };

  const viewDeck = () => {
    navigation.navigate("DeckDetail", { deckId });
  };

  return (
    <View style={styles.center}>
      <Text style={[styles.h3, { marginTop: 40 }]}>Quiz Completed</Text>
      <Text style={styles.h3}>
        {(correctCount/cardCount)*100}%
      </Text>
      <Text style={styles.h3}>of Answered Correctly</Text>
      <Button style={styles.button} onPress={handleRestart}>
        <Text style={styles.buttonText}>RESTART QUIZ</Text>
      </Button>
      <Button style={styles.button} onPress={() => viewDeck()}>
        <Text style={styles.buttonText}>BACK TO DECK</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  h3: {
    color: "#0f4c75",
    fontSize: 20,
    textTransform: "uppercase"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#0f4c75"
  },
  buttonText: {
    color: "white",
    fontSize: 15
  }
});

const mapStateToProps = ({ deck }) => {
  return{
    item: deck,
  }
};

export default connect(mapStateToProps)(QuizResult);
