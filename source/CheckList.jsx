import React from 'react';

const CheckList = (props) => {
  const tasks = props.tasks.map(
    (task) => (
      <li key={task.id}
        className="checklist__task"
      >
        <input type="checkbox"
          defaultChecked={task.done}
          checked={task.done}
        />
        {task.name}
        <a href="#" className="checklist__task--remove"></a>
      </li>
    )
  );
  return (
    <div className="checklist">
      <ul>{tasks}</ul>
      <input type="text"
        className="checklist__add-task"
        placeholder="Type then hit Enter to add a task"
      />
    </div>
  );
};

CheckList.propTypes = {
  tasks: React.PropTypes.arrayOf(React.PropTypes.object),
  cardId: React.PropTypes.number,
};

export default CheckList;
