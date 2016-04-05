import React from 'react';
import Card from './Card';
// import Immutable from 'immutable';

const List = (props) => {
  const cards = props.cards.map(
    (card) => (
      <Card key={card.get('id')}
        taskCallbacks={props.taskCallbacks}
        id={card.get('id')}
        title={card.get('title')}
        description={card.get('description')}
        color={card.get('color')}
        tasks={card.get('tasks')}
      />
    )
  );
  return (
    <div className="list">
      <h1>{props.title}</h1>
      {cards}
    </div>
  );
};

List.propTypes = {
  cards: React.PropTypes.object,
  title: React.PropTypes.string.isRequired,
  taskCallbacks: React.PropTypes.object,
};

export default List;
