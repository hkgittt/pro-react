import React from 'react';
import Card from './Card';

const List = (props) => {
  const cards = props.cards.map(
    (card) => (
      <Card key={card.id}
        id={card.id}
        title={card.title}
        description={card.description}
        color={card.color}
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
  cards: React.PropTypes.arrayOf(React.PropTypes.object),
  title: React.PropTypes.string.isRequired,
};

export default List;
