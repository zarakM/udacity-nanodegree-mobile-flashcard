import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import QuizResult from './QuizResult';
import CardItem from './CardItem';

class Quiz extends React.Component {
  render() {
    const { deck } = this.props;
    const unansweredQuestions = Object.values(deck.questions)
      .filter(question => question.correct === null);
    const questionsRemaining = unansweredQuestions.length;

    return (
      <View>
        {questionsRemaining > 0 ? (
          <CardItem
            card={unansweredQuestions[0]}
            deckId={deck.id}
            questionsRemaining={questionsRemaining}
          />
        ) : (
          <QuizResult deckId={deck.id} />
        )}    
      </View>
    );
  }
}

const mapStateToProps = ({ deck }, { route }) => {
  const {deckId} = route.params
    
  return {
    deck: deck[deckId],
  }
}

export default connect(mapStateToProps)(Quiz);
