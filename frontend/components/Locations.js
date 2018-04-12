import React, { Component } from 'react';
//import chunk from 'lodash.chunk';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';

class Locations extends Component {

constructor (props) {
    super(props);
    this.state = {
      locations: [],
      navigate: false,
      navigateTo: '',
      selectedLocation: [],
      navigateTo: "",
      item: "",
      currentPage: 1,
      locationsPerPage: 9,
      cities_list: [],
      selectedCity: {
        value: undefined,
        label: undefined
      },
      selectedRating: {
        value: undefined,
        label: undefined
      },
      selectedSort: {
        value: undefined,
        label: undefined,
      },
      sort_by: undefined,
      sort_attr: undefined
    };
    this.returnNoResults = this.returnNoResults.bind(this);
};

componentDidMount(props) {
    fetch('/getsceniclocations').then(results =>{
      console.log(results)
      return results.json();
    }).then(data =>{
      console.log(data)
      this.fetchData(data);
    })
  this.getCities();
}

fetchData(data) {
  let views = data.map((scenicloc) =>{
    return(
      <div id="location_instance" key={scenicloc.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/location/" + scenicloc.scenic_id, selectedLocation: scenicloc})}}>
        <li className="col">
            <img src={scenicloc.scenic_picture} style={{width: 300, height: 300}} alt={scenicloc.scenic_name}/>
            <span className="picText">
              <span><b>{scenicloc.scenic_name}</b>
              <br /><br />{scenicloc.scenic_address}
              <br />{scenicloc.scenic_rating + "/5"}
              </span>
            </span>
        </li>
      </div>
    )
  })
  this.setState({locations: views});
}

getCities() {
  fetch('/getcities').then(results =>{
    console.log(results)
    return results.json();
  }).then(data=>{
    console.log(data)
    let cities = data.map((city) =>{
      return(
        {value: city.city_id, label: city.city_name}
      )
    })
    this.setState({cities_list: cities});
  })
}

handleCityChange(selectedCity){
  if (selectedCity == null) {
    this.state.selectedCity = {
      value: undefined,
      label: undefined
    };
  } else if (selectedCity){
    this.state.selectedCity = selectedCity;
    this.setState({selectedCity: selectedCity});
  }
  this.update();
}

handleSortChange(selectedSort) {
  if (selectedSort == null) {
    this.state.selectedSort = {
      value: undefined,
      label: undefined
    };
    this.state.sort_attr = undefined
    this.state.sort_by = undefined;
    this.setState({selectedSortBy: undefined});
  } else if (selectedSort){
    var sortArray = selectedSort.value.split("/");
    var sort = sortArray[0];
    var sortby = sortArray[1];
    this.state.sort_attr = sort;
    this.state.sort_by = sortby;
    this.setState({sort_attr: sort});
    this.setState({sort_by: sortby});
    this.setState({ selectedSort });
  }
  this.update();
}

handleRatingChange (selectedRating){

  if (selectedRating == null) {
    this.state.selectedRating = {
      value: undefined,
      label: undefined
    };
  } else if (selectedRating) {
    this.state.selectedRating = selectedRating;
    this.setState({selectedRating: selectedRating});
  }
  this.update();
}

returnNoResults() {
    return (
      <div className="intro-text text-center bg-faded p-5 rounded">
          <span className="section-heading-upper text-center">No Results</span>
      </div>
    )
  }


update () {
  var cityfilter = this.state.selectedCity.value;
  var sort = this.state.sort_attr;
  var sortby = this.state.sort_by;
  var ratfilter = this.state.selectedRating.value;

  fetch('//api.espressoyoself.me/locations_filter_sort/?sort=scenic_' + sort + '&sortby=' + sortby +'&cityfilter=' + cityfilter + '&ratfilter=' + ratfilter
    ).then(results => {
    console.log(results)
    return results.json();
  }).then(data => {
    this.fetchData(data);
    if(data.length == 0) {
      console.log("No results!");
      locations = [<div></div>, this.returnNoResults()];
    }
  })
  this.setState({currentPage: 1})
}

handleClick(pageNumber, arr, event) {
  if(pageNumber <= 1) {
    document.getElementById("prev").style.visibility="hidden";
  } else {
    document.getElementById("prev").style.visibility="visible";
  }

  if(pageNumber >= Math.ceil(arr.length / this.state.locationsPerPage)) {
    document.getElementById("next").style.visibility="hidden";
  } else {
    document.getElementById("next").style.visibility="visible";
  }

    this.setState({
      currentPage: pageNumber
    });
  }

render() {

  const{locations, currentPage, locationsPerPage} = this.state;

  const concat_locs = [];
  const locs = this.state.locations.map((locations, index) => {
    if (locations) {
      concat_locs.push(locations)
    }
  });

  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = concat_locs.slice(indexOfFirstLocation, indexOfLastLocation);

  const pageNumbers = [];
  const nextPageNumbers = currentPage + 7 <= Math.ceil(concat_locs.length / locationsPerPage)? currentPage + 7 : Math.ceil(concat_locs.length / locationsPerPage)
  const prevPageNumber = currentPage - 2 >= 1 ? currentPage - 2: 1
  for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
    pageNumbers.push(i);
  }

  if (this.state.navigate) {
    console.log("REDIRCT" + this.state.selectedLocation);
    return <Redirect to={{pathname: this.state.navigateTo, state: {selectedLocation: this.state.selectedLocation}}} push={true} />;
  }

  const renderLocations = currentLocations.map((locations, index) => {
    if (locations) {
      return <li key={index}>{locations}</li>;
    }
  });

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        style={this.state.currentPage === number ? {color:'orange'} : {}}
        onClick={this.handleClick.bind(this, number, concat_locs)}
      >
        {number}
      </li>
    );
  });

  const SelectPackage = require('react-select');
  const Select = SelectPackage.default;
  const {selectedCity} = this.state;
  const {selectedRating} = this.state;
  const {selectedSort} = this.state;

  const cityValue = selectedCity && selectedCity.value;
  const ratingValue = selectedRating && selectedRating.value;
  const sortValue = selectedSort && selectedSort.value

  return (
      <div>
        {/*location dropdown*/}
        <div className="filters-and-grid">
        <div className="filter-container-locs">
          <div className="filter">
            <h6>Choose a City to Explore</h6>
            <Select
                id="cityfilter"
                name="form-field-name"
                value={cityValue}
                onChange={this.handleCityChange.bind(this)}
                options={this.state.cities_list}
            />
          </div>
          <div className="filter">
            <h6>Filter by Rating</h6>
            <Select
                id="ratingfilter"
                name="form-field-name"
                value={ratingValue}
                onChange={this.handleRatingChange.bind(this)}
                options={[
                  {value: '0', label: '0+'},
                  {value: '1', label: '1+'},
                  {value: '2', label: '2+'},
                  {value: '3', label: '3+'},
                  {value: '4', label: '4+'},
                ]}
            />
          </div>
          <div className="filter">
            <h6>Sort By</h6>
            <Select
                id="sort"
                name="form-field-name"
                value={sortValue}
                onChange={this.handleSortChange.bind(this)}
                options={[
                  {value: 'name/asc', label: 'Name: A - Z'},
                  {value: 'name/desc', label: 'Name: Z - A'},
                  {value: 'rating/asc', label: 'Rating: Low - High'},
                  {value: 'rating/desc', label: 'Rating: High - Low'},
                ]}
            />
          </div>
        </div>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <div className="row">
                  {renderLocations}
                </div>
              </ul>
            </div>
          </div>
        </section>
        </div>
        <div className="col-md-12 text-center">
        <ul className="page-list">
        <li
          id="<<"
          style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
          onClick={this.handleClick.bind(this, 1, concat_locs)}> &lt;&lt;
        </li>
        <li
          id="prev"
          style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
          onClick={this.handleClick.bind(this, this.state.currentPage - 1, concat_locs)}> &lt;prev
        </li>
          {renderPageNumbers}
          <li
            id="next"
            style={this.state.currentPage >= Math.ceil(concat_locs.length / this.state.locationsPerPage) ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, this.state.currentPage + 1, concat_locs)}> next&gt;
          </li>
          <li
            id=">>"
            style={this.state.currentPage  >= Math.ceil(concat_locs.length / this.state.locationsPerPage) ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, Math.ceil(concat_locs.length / this.state.locationsPerPage), concat_locs)}> &gt;&gt;
          </li>
        </ul>
        </div>
      </div>
    );
  }
}


export default Locations;
