import React, { Component } from 'react';

class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchValue: "",
      results: []
    };

    // This binding is necessary to make `this` work in the callback
    this.search = this.search.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  };

  componentDidMount(props) {

  }

  search() {
    console.log("Value of search value after clicking Search: " + this.state.searchValue);
    fetch('/search' + this.state.searchValue).then(results => {
      console.log(results)
      return results.json();
    }).then(data => {
      console.log(data)
      // let cities = data.map((city) =>{
      //   return(
      //     <li><a href="#">{city.city_name}</a></li>
      //   )
      // })
      // this.setState({cities_list: cities});
    })

  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} type="text" name="search" /*placeholder="Search..."*/ onChange={evt => this.updateInputValue(evt)}/>
        <button type="button" className="btn" onClick={this.search}>Search</button>
      </div>
    );
  }

  updateInputValue(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }

}

export default Search;
