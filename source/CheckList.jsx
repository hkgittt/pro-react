import React from 'react';

class CheckList extends React.Component {
  constructor(...args) {
    super(...args);
    this.checkInputKeyPress = this.checkInputKeyPress.bind(this);
    console.log('@CheckList', this.props.tasks);
  }
  checkInputKeyPress(evt) {
    const lEvt = evt;
    if (evt.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
      lEvt.target.value = '';
    }
  }
  render() {
    const tasks = this.props.tasks.map(
      (task, taskIndex) => (
        <li key={task.get('id')}
          className="checklist__task"
        >
          <input type="checkbox"
            defaultChecked={task.get('done')}
            checked={task.get('done')}
            onChange={this.props.taskCallbacks.toggle
              .bind(null, this.props.cardId, task.get('id'), taskIndex)}
          />
          {task.get('name')}
          <a href="#" className="checklist__task--remove"
            onClick={this.props.taskCallbacks.delete
              .bind(null, this.props.cardId, task.get('id'), taskIndex)}
          >
          </a>
        </li>
      )
    );
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text"
          className="checklist__add-task"
          placeholder="Type then hit Enter to add a task"
          onKeyPress={this.checkInputKeyPress}
        />
      </div>
    );
  }
}

CheckList.propTypes = {
  tasks: React.PropTypes.object,
  cardId: React.PropTypes.number,
  taskCallbacks: React.PropTypes.object,
};

export default CheckList;
