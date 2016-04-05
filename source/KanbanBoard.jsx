import React from 'react';
import List from './List';

const KanbanBoard = (props) => {
  console.log('@KanbanBoard', props.cards.toString());
  return (
    <div className="kanban-board">
      <List
        taskCallbacks={props.taskCallbacks}
        id="todo"
        title="To Do"
        cards={props.cards.filter((card) => card.get('status') === 'todo')}
      />
      <List
        taskCallbacks={props.taskCallbacks}
        id="in-progress"
        title="In Progress"
        cards={props.cards.filter((card) => card.get('status') === 'in-progress')}
      />
      <List
        taskCallbacks={props.taskCallbacks}
        id="done"
        title="Done"
        cards={props.cards.filter((card) => card.get('status') === 'done')}
      />
    </div>
  );
};


KanbanBoard.propTypes = {
  cards: React.PropTypes.object, // immutable List
  taskCallbacks: React.PropTypes.object,
};

export default KanbanBoard;
