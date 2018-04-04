import React, { Component } from 'react';
//import chunk from 'lodash.chunk';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';

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
      cities_list: [],
      selectedCity: '',
      selectedRating: '',
      selectedSort: ''
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

handleSortChange(selectedSort) {
  this.setState({ selectedSort });
  if(selectedSort === null) {
    this.resetToAllData();
  } else if (selectedSort) {
      var value = selectedSort.value;
        fetch('/sceniclocations/sort/' + value).then(results => {
          return results.json();
        }).then(data => {
            let views = data.map((scenicloc) => {
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
              );
            })
          this.setState({locations: views})
        })
    }
}

handleRatingChange(selectedRating){
  console.log("INSIDE HANDLE CITY");
  this.setState({ selectedRating });
  //console.log(`Selected: ${selectedCity.label}`);
  if (selectedRating === null) {
    this.resetToAllData();
  } else if (selectedRating) {
    var value = selectedRating.value;
    console.log(value);
    let views = this.state.full_data.map((scenicloc) =>{
      if (scenicloc.scenic_rating >= value) {
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
        onClick={this.handleClick.bind(this, number)}
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
          <div className="filter">
            <h6>Filter by Rating</h6>
            <Select
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
            <h6>Sort by Rating</h6>
            <Select
                name="form-field-name"
                value={sortValue}
                onChange={this.handleSortChange.bind(this)}
                options={[
                  {value: 'ratingasc', label: 'Low - High'},
                  {value: 'ratingdesc', label: 'High - Low'},
                ]}
            />
          </div>
          <div className="filter">
            <h6>Sort alphabetically</h6>
            <Select
                name="form-field-name"
                value={sortValue}
                onChange={this.handleSortChange.bind(this)}
                options={[
                  {value: 'atoz', label: 'A - Z'},
                  {value: 'ztoa', label: 'Z - A'},
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
