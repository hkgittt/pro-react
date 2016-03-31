import './entry.scss';
import React from 'react';
import KanbanBoard from './KanbanBoard';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
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
      cards: [],
    };
  }
  componentDidMount() {
    fetch(`${API_URL}/cards`, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ cards: responseData });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }
  render() {
    return (
      <KanbanBoard cards={this.state.cards} />
    );
  }
}


ReactDOM.render(<KanbanBoardContainer />, document.getElementById('app'));
