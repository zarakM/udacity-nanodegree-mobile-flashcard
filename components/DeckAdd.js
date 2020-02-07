import React from "react";
import { connect } from "react-redux";
import { saveDeck } from "../utils/api";
import { createId } from "../utils/helper";
import { addDeck } from "../actions";
import {
  StyleSheet
} from "react-native";
import { Container, Toast, Item,Text,Button, Input } from "native-base";

class AddDeckForm extends React.Component {
  state = {
    title: ""
  };

  handleTitleChange(title) {
    this.setState({ title });
  }

  handleSubmit() {
    if (this.state.title === "") {
      Toast.show({
        text: "Please Enter Title to proceed with Deck Creation",
        buttonText: "Okay"
      });
    } else {
      const { dispatch, navigation } = this.props;
      const { title } = this.state;
      const id = createId();
      const newDeck = { id, title, questions: {} };

      saveDeck(newDeck).then(() => {
        dispatch(addDeck(newDeck));
        this.setState({ title: "TITLE" });
        navigation.navigate("DeckDetail", { deckId: id });
      });
    }
  }

  render() {
    const { title } = this.state;

    return (
      <Container style={styles.center}>
        <Text style={styles.headerText}>Title of your new Deck?</Text>
        <Item style={styles.textInput} rounded>
          <Input
            placeholder="Enter Deck Title"
            
            value={title}
            onChangeText={text => this.handleTitleChange(text)}
          />
        </Item>
        <Button style={styles.button} full warning onPress={() => this.handleSubmit()}>
          <Text>Add</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    backgroundColor:"#f1fcfc",
    alignItems: "center",
  },
  headerText: {
    color: "#0f4c75",
    fontSize: 30,
    marginBottom: 40,
    marginTop:50
  },
  textInput:{
    marginLeft:10,
    marginRight:10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft:10,
    marginRight:10,
    marginTop: 40,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#0f4c75"
  },
  buttonText: {
    fontSize: 15
  }
});

export default connect()(AddDeckForm);
