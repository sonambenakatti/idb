import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';

class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchValue: "",
      searchResults: [],
      resultsPerPage: 9,
      navigateTo: "",
      instanceType: "",
      selectedInstance: []
    };

    // This binding is necessary to make `this` work in the callback
    this.search = this.search.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  };

  componentDidMount(props) {

  }

  search() {
    console.log("Value of search value after clicking Search: " + this.state.searchValue);
    fetch('/search/' + this.state.searchValue).then(results => {
      console.log(results)
      return results.json();
    }).then(data => {
      console.log(data)
      let results = data.map((result) =>{
        // Handle differences between the three models
        if(!(result["shop_id"] === undefined)) {
          this.setState({instanceType: "CoffeeInstance"});
          return this.returnCoffeeShop(result);
        } else if (!(result["scenic_id"] === undefined)) {
          this.setState({instanceType: "Location"});
        } else {
          this.setState({instanceType: "Snapshot"});
        }

      })
      this.setState({searchResults: results});
    })

  }

  returnCoffeeShop(result) {
    return(
      <div id="shop_instance" key={result.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedInstance: result})}}>
        <li className="col">
            <img src={result.shop_picture} style={{width: 300, height: 300}} alt={result.shop_picture}/>
            <span className="picText">
              <span><b>{result.shop_name}</b><br /><br />{result.shop_address}<br />{result.shop_price}<br />{result.shop_rating + "/5"}</span>
            </span>
        </li>
      </div>
    )
  }

  render() {
     var searchResults = this.state.searchResults;
     var locations = this.state.resultsPerPage;

     if (this.state.navigate) {
       var instanceType = this.state.instanceType;
       console.log("instanceType: " + instanceType)
       var instance_state = {};

       // Need to account for different variable names within the instance pages
       if(instanceType === "CoffeeInstance") {
         instance_state = {shop: this.state.selectedInstance};
         console.log(instance_state);
       } else if(instanceType === "Location") {
         instance_state = {selectedLocation: this.state.selectedInstance};
       } else {
         instance_state = {snapshot: this.state.selectedInstance};
       }
       return <Redirect to={{pathname: this.state.navigateTo, state: instance_state}} push={true} />;
     }

    return (
      <div>
        <input value={this.state.inputValue} type="text" name="search" /*placeholder="Search..."*/ onChange={evt => this.updateInputValue(evt)}/>
        <button type="button" className="btn" onClick={this.search}>Search</button>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <div className="row">
                  {searchResults}
                </div>
              </ul>
            </div>
          </div>
        </section>
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
