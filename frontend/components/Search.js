import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import Highlighter from 'react-highlight-words';
import styles from '../../backend/static/css/highlighter.css'


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
    this.setState({searchResults: []});
    console.log("Value of search value after clicking Search: " + this.state.searchValue);
    fetch('/search/' + this.state.searchValue).then(results => {
      console.log(results)
      return results.json();
    }).then(data => {
      console.log(data)
      let results = data.map((result) => {
        // Handle differences between the three models
        if(result["shop_name"] !== undefined) {
          return this.returnCoffeeShop(result);
        } else if (result["scenic_name"] !== undefined) {
          return this.returnScenicLocation(result);
        } else if (result["snap_name"] !== undefined) {
          return this.returnSnapshot(result);
        }
      })
      if(data.length == 0) {
        console.log("No results!");
        results = this.returnNoResults();
      }
      this.setState({searchResults: results});
    })

  }

  returnCoffeeShop(result) {
    return(
        <div id="shop_instance" onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedInstance: result, instanceType: "CoffeeInstance"})}}>
          <li className="col">
              <img src={result.shop_picture} style={{width: 300, height: 300}}/>
              <span className="picText">
                <span><b>{this.highlightText(result.shop_name)}</b>
                <br /><br />{this.highlightText(result.shop_address)}
                <br />{this.highlightText(result.shop_price)}<br />
                {this.highlightText(result.shop_rating + "/5")}</span>
              </span>
          </li>
        </div>
    );
  }

  highlightText(text) {
    return (
      <Highlighter
         highlightClassName={styles.Highlight}
         searchWords = {this.state.searchValue.split(" ")}
         autoEscape={true}
         textToHighlight= {text}
      />
    )
  }

  returnScenicLocation(result) {
    if(result.scenic_picture === "") {
      result.scenic_picture = "/static/img/ruchi.jpg"
    }
    return(
      <div id="location_instance" key={result.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/location", selectedInstance: result, instanceType: "Location"})}}>
        <li className="col">
            <img src={result.scenic_picture} style={{width: 300, height: 300}}/>
            <span className="picText">
              <span><b>{this.highlightText(result.scenic_name)}</b>
              <br /><br />{this.highlightText(result.scenic_address)}
              <br />{this.highlightText(result.scenic_rating + "/5")}
              </span>
            </span>
        </li>
      </div>
    );
  }

  returnSnapshot(result) {
    return(
      <div id="snap_instance" key={result.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedInstance: result, instanceType: "Snapshot"})}}>
        <li className="col">
            <img src={result.snap_picture} style={{width: 300, height: 300}}/>
            <span className="picText"><span><b>{this.highlightText(result.snap_name)}</b><br /><br />
            {this.highlightText(result.snap_tags)}<br />
            {this.highlightText(result.snap_favs + " Faves")}</span></span>
        </li>
      </div>
    );
  }


  returnNoResults() {
    return (
      <div className="intro-text text-center bg-faded p-5 rounded">
          <span className="section-heading-upper text-center">No search results found for {this.state.searchValue}</span>
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
        <section className="page-section-1">
          <div className="search">
            <input value={this.state.inputValue} type="text" name="search" /*placeholder="Search..."*/ onChange={evt => this.updateInputValue(evt)}/>
            <button type="button" className="btn" onClick={this.search}>Search</button>
          </div>
        </section>
        <section className="page-section-1">
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
