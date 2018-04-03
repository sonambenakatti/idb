import React, { Component } from 'react';
//import chunk from 'lodash.chunk';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';

class Locations extends Component {

constructor (props) {
    super(props);
    this.state = {
      full_data: [],
      locations: [],
      navigate: false,
      navigateTo: '',
      selectedLocation: [],
      navigateTo: "",
      item: "",
      currentPage: 1,
      locationsPerPage: 9,
      cities_list: []
    };
};

componentDidMount(props) {
    fetch('/getsceniclocations').then(results =>{
      console.log(results)
      return results.json();
    }).then(data =>{
      console.log(data)
      this.setState({full_data: data})
      let views = data.map((scenicloc) =>{
        return(
        <div id="location_instance" key={scenicloc.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/location", selectedLocation: scenicloc})}}>
          <li className="col">
              <img src={scenicloc.scenic_picture} style={{width: 300, height: 300}} alt="Photo1"/>
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
  })
  this.getCities();
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
  console.log("INSIDE HANDLE CITY");
  this.setState({ selectedCity });
  //console.log(`Selected: ${selectedCity.label}`);
  if (selectedCity === null) {
    this.resetToAllData();
  } else if (selectedCity) {
    var value = selectedCity.value;
    console.log(value);
    let views = this.state.full_data.map((scenicloc) =>{
      if (scenicloc.city_id === value) {
        return(
          <div id="location_instance" key={scenicloc.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/location", selectedLocation: scenicloc})}}>
            <li className="col">
                <img src={scenicloc.scenic_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                <span className="picText">
                  <span><b>{scenicloc.scenic_name}</b>
                  <br /><br />{scenicloc.scenic_address}
                  <br />{scenicloc.scenic_rating + "/5"}
                  </span>
                </span>
            </li>
          </div>
        )
      }
    })
    this.setState({locations: views});
  }
}

resetToAllData() {
  let views = this.state.full_data.map((scenicloc) =>{
    return(
    <div id="location_instance" key={scenicloc.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/location", selectedLocation: scenicloc})}}>
      <li className="col">
          <img src={scenicloc.scenic_picture} style={{width: 300, height: 300}} alt="Photo1"/>
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

handleClick(pageNumber, event) {
  if(pageNumber <= 1) {
    document.getElementById("prev").style.visibility="hidden";
  } else {
    document.getElementById("prev").style.visibility="visible";
  }

  if(pageNumber >= Math.ceil(this.state.locations.length / this.state.locationsPerPage)) {
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

  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

  const pageNumbers = [];
  const nextPageNumbers = currentPage + 7 <= Math.ceil(locations.length / locationsPerPage)? currentPage + 7 : Math.ceil(locations.length / locationsPerPage)
  const prevPageNumber = currentPage - 2 >= 1 ? currentPage - 2: 1
  for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
    pageNumbers.push(i);
  }

  if (this.state.navigate) {
    console.log("REDIRCT" + this.state.selectedLocation);
    return <Redirect to={{pathname: this.state.navigateTo, state: {selectedLocation: this.state.selectedLocation}}} push={true} />;
  }

  const renderLocations = currentLocations.map((locations, index) => {
    return <li key={index}>{locations}</li>;
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

  const SelectPackage = require('react-select');
  const Select = SelectPackage.default;
  const {selectedCity} = this.state;

  const cityValue = selectedCity && selectedCity.value;

  return (
      <div>
        {/*location dropdown*/}
        <div className="filters-and-grid">
        <div className="filter-container">
          <div className="filter">
            <h6>Choose a City to Explore</h6>
            <Select
                name="form-field-name"
                value={cityValue}
                onChange={this.handleCityChange.bind(this)}
                options={this.state.cities_list}
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
          id="prev"
          style = {{visibility: "hidden"}}
          onClick={this.handleClick.bind(this, this.state.currentPage - 1)}> &lt;prev
        </li>
          {renderPageNumbers}
          <li
            id="next"
            onClick={this.handleClick.bind(this, this.state.currentPage + 1)}> next&gt;
          </li>
        </ul>
        </div>
      </div>
    );
  }
}


export default Locations;
