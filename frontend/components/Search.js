import React, { Component } from 'react';

class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      results: []
    };
  };

  componentDidMount(props) {
  }

  render() {
    return (
      <form>
        <input type="text" name="search" placeholder="Search.." />
      </form>
    );
  }
}

export default Search;
