import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';

const titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName} is longer than 80 characters`
      );
    }
  }
  return null;
};

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
            taskCallbacks={this.props.taskCallbacks}
            tasks={this.props.tasks}
          />
        </div>
      );
    }

    const sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color,
    };

    return (
      <div className="card">
        <div style={sideColor} />
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
  title: titlePropType,
  description: React.PropTypes.string,
  id: React.PropTypes.number,
  tasks: React.PropTypes.object,
  color: React.PropTypes.string,
  taskCallbacks: React.PropTypes.object,
};

export default Card;
