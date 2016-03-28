import React from 'react';
import CheckList from './CheckList';

class Card extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showDetails: false,
    };
    this.toggleDetails = this.toggleDetails.bind(this);
  }
  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  }
  render() {
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          {this.props.description}
          <CheckList cardId={this.props.id}
            tasks={this.props.tasks}
          />
        </div>
      );
    }
    return (
      <div className="card">
        <div className={
            this.state.showDetails ? 'card__title card__title--is-open' : 'card__title'
          }
          onClick={this.toggleDetails} // comment
        >{this.props.title}</div>
        {cardDetails}
      </div>
    );
  }
}

Card.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  id: React.PropTypes.number,
  tasks: React.PropTypes.array,
};

export default Card;
