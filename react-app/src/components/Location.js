import React, { Component } from 'react';

/* The instance page for scenic locations */

class Location extends Component {

  constructor (props) {
      super(props);
      console.log(this.props.location.state);
      this.state = {
        // location: this.props.location.selectedLocation,
      };
      // console.log(this.state.location);
  };

  componentDidMount() {
  }

  render() {
    return (
      <p>test test test</p>
      );
  }

}

export default Location;
