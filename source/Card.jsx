import React from 'react';
import CheckList from './CheckList';

const Card = (props) => (
  <div className="card">
    <div className="card__title">
      {props.title}
    </div>
    <div className="card__details">
      {props.description}
      <CheckList cardId={props.id}
        tasks={props.tasks}
      />
    </div>
  </div>
);

Card.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  id: React.PropTypes.number,
  tasks: React.PropTypes.array,
};

export default Card;
