import React from 'react';
import List from './List';

const KanbanBoard = (props) => (
  <div className="kanban-board">
    <List
      id="todo"
      title="To Do"
      cards={props.cards.filter((card) => card.status === 'todo')}
    />
    <List
      id="in-progress"
      title="In Progress"
      cards={props.cards.filter((card) => card.status === 'in-progress')}
    />
    <List
      id="done"
      title="Done"
      cards={props.cards.filter((card) => card.status === 'done')}
    />
  </div>
);

KanbanBoard.propTypes = {
  cards: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default KanbanBoard;
