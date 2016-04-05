import 'babel-polyfill';
import './entry.scss';
import React from 'react';
import KanbanBoard from './KanbanBoard';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Immutable from 'immutable';
require('es6-promise').polyfill();

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: '3li4u2o3iooi',
};

class KanbanBoardContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      cards: Immutable.List([]),
    };
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }
  componentDidMount() {
    fetch(`${API_URL}/cards`, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('orig data', responseData);
      this.setState({ cards: Immutable.fromJS(responseData) });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }
  addTask(cardId, taskName) {
    const cardIndex = this.state.cards.findIndex((card) => card.get('id') === cardId);

    const newTask = Immutable.Map({
      id: Date.now(),
      name: taskName,
      done: false,
    });

    const nextState = {
      cards: this.state.cards.updateIn([cardIndex, 'tasks'],
      (val) => val.push(newTask)),
    };

    this.setState(nextState);

    // Call the API to add the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask),
    })
    .then((response) => response.json())
    .then((responseData) => {
    // When the server returns the definitive ID
    // used for the new Task on the server, update it on React
      // first get the index of the task that we just added
      const taskIndex = this.state.cards.get(cardIndex).get('tasks').findIndex(
        (task) => task.get('id') === newTask.get('id')
      );
      const nextStateWithRealId = {
        cards: this.state.cards.setIn([cardIndex, 'tasks', taskIndex, 'id'],
          responseData.id
        ),
      };
      console.log(this.state.cards.get(1).toString());
      console.log(nextStateWithRealId.cards.get(1).toString());
      this.setState(nextStateWithRealId);
    });
  }
  deleteTask(cardId, taskId, taskIndex) {
    const cardIndex = this.state.cards.findIndex((card) => card.get('id') === cardId);
    // console.log('deleting task in card', cardIndex);

    const nextState = {
      cards: this.state.cards.deleteIn([cardIndex, 'tasks', taskIndex]),
    };

    this.setState(nextState);

    // server fetch
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS,
    });
  }
  toggleTask(cardId, taskId, taskIndex) {
    const cardIndex = this.state.cards.findIndex((card) => card.get('id') === cardId);

    let newVal;

    const nextState = {
      cards: this.state.cards.updateIn([cardIndex, 'tasks', taskIndex, 'done'],
        (val) => (newVal = !val)),
    };

    this.setState(nextState);

    // Call the API to toggle the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({ done: newVal }),
    });
  }
  render() {
    return (
      <KanbanBoard cards={this.state.cards}
        taskCallbacks={{
          toggle: this.toggleTask,
          delete: this.deleteTask,
          add: this.addTask,
        }}
      />
    );
  }
}


ReactDOM.render(<KanbanBoardContainer />, document.getElementById('app'));
