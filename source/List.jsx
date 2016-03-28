import React from 'react';
import Card from './Card';

const List = (props) => {
  const cards = props.cards.map(
    (card) => (
      <Card id={card.id}
        title={card.title}
        description={card.description}
        tasks={card.tasks}
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
  cards: React.PropTypes.array,
  title: React.PropTypes.string,
};

export default List;
