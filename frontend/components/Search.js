import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';

class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchValue: "",
      searchResults: [],
      resultsPerPage: 9,
      currentPage: 1,
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
      //console.log(results)
      return results.json();
    }).then(data => {
      console.log(data)
      let results = data.map((result) => {
        // Handle differences between the three models
        if(!(result["shop_name"] === undefined)) {
          this.setState({instanceType: "CoffeeInstance"});
          return this.returnCoffeeShop(result);
        } else if (!(result["scenic_name"] === undefined)) {
          this.setState({instanceType: "Location"});
          return this.returnScenicLocation(result);
        } else if (!(result["snap_name"] === undefined)) {
          this.setState({instanceType: "Snapshot"});
        } else {
          console.log("else " + result);
        }
      })
      if(data.length == 0) {
        console.log("No results!");
        results = this.returnNoResults();
      }
      console.log("RESULTS HERE: " + results)
      this.setState({searchResults: results});
    })

  }

  returnCoffeeShop(result) {
    return(
        <div id="shop_instance" key={result.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedInstance: result})}}>
          <li className="col">
              <img src={result.shop_picture} style={{width: 300, height: 300}} alt={result.shop_picture}/>
              <span className="picText">
                <span><b>{result.shop_name}</b>
                <br /><br />{result.shop_address}
                <br />{result.shop_price}<br />
                {result.shop_rating + "/5"}</span>
              </span>
          </li>
        </div>
    );
  }

  returnScenicLocation(result) {
    return(
      <div id="location_instance" key={result.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/location", selectedInstance: result})}}>
        <li className="col">
            <img src={result.scenic_picture} style={{width: 300, height: 300}} alt={result.scenic_name}/>
            <span className="picText">
              <span><b>{result.scenic_name}</b>
              <br /><br />{result.scenic_address}
              <br />{result.scenic_rating + "/5"}
              </span>
            </span>
        </li>
      </div>
    );
  }

  returnSnapshot(result) {
    return(
      <div id="snap_instance" key={result.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedInstance: result})}}>
        <li className="col">
            <img src={result.snap_picture} style={{width: 300, height: 300}} alt={result.snap_name}/>
            <span className="picText"><span><b>{result.snap_name}</b><br /><br />
            {result.snap_tags}<br />
            {result.snap_favs+" Faves"}</span></span>
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

  handleClick(pageNumber, event) {
      if(pageNumber <= 1) {
        document.getElementById("prev").style.visibility="hidden";
      } else {
        document.getElementById("prev").style.visibility="visible";
      }
      if(pageNumber >= Math.ceil(this.state.searchResults.length / this.state.resultsPerPage)) {
        document.getElementById("next").style.visibility="hidden";
      } else {
        document.getElementById("next").style.visibility="visible";
      }
      console.log("set state")
      this.setState({
        currentPage: pageNumber
      });
    }

  render() {
     const{searchResults, currentPage, resultsPerPage} = this.state;

     const indexOfLastResult = currentPage * resultsPerPage;
     const indexOfFirstResult = indexOfLastResult - resultsPerPage;
     const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

     const pageNumbers = [];
     const nextPageNumbers = currentPage + 7 <= Math.ceil(searchResults.length / resultsPerPage)? currentPage + 7 : Math.ceil(searchResults.length / resultsPerPage)
     const prevPageNumber = currentPage - 2 >= 1 ? currentPage - 2: 1
     for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
       pageNumbers.push(i);
     }

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

    const renderResults = currentResults.map((res, index) => {
      return <li key={index}>{res}</li>;
    });

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          style={this.state.currentPage === number ? {color:'orange'} : {}}
          onClick={this.handleClick.bind(this, number)}
        >
          {number}
        </li>
      );
    });

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
                  {renderResults}
                </div>
              </ul>
            </div>
          </div>
        </section>
        <section className="page-section-1">
          <div className="col-md-12 text-center">
          <ul className="page-list">
            <li
              id="prev"
              style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
              onClick={this.handleClick.bind(this, this.state.currentPage - 1)}> &lt;prev
            </li>
              {renderPageNumbers}
            <li
              id="next"
              style={this.state.currentPage >= Math.ceil(this.state.searchResults.length / this.state.resultsPerPage) ? {visibility:'hidden'} : {}}
              onClick={this.handleClick.bind(this, this.state.currentPage + 1)}> next&gt;
            </li>
          </ul>
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
