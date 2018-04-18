import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';

class SnapshotsMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      navigate: false,
      selectedSnapshot: [],
      navigateTo: "",
      currentPage: 1,
      photosPerPage: 9,
      cities_list: [],
      selectedCity: {
        value: undefined,
        label: undefined
      },
      selectedFavs: {
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

  // Initial load of data into page
  componentDidMount() {
    fetch('/getsnapshots').then(results =>{
      return results.json();
    }).then(data=>{
      this.fetchData(data)
    });
    this.getCities();
  };

  // Renders data after fetch call
  fetchData(data) {
    let snapshots = data.map((snapshot) =>{
      return(
        <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot/" + snapshot.snap_id, selectedSnapshot: snapshot})}}>
          <li className="col">
              <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt={snapshot.snap_name}/>
              <span className="picText"><span><b>{snapshot.snap_name}</b><br /><br />
              {snapshot.snap_tags}<br />
              {snapshot.snap_favs+" Faves"}</span></span>
          </li>
        </div>
      );
    });
    if(data.length == 0) {
      console.log("No results!");
      snapshots = [<div></div>, this.returnNoResults()];
    }
    this.setState({photos: snapshots});
  }

  // Gets the list of possible cities for the city filter
  getCities() {
    fetch('/getcities').then(results =>{
      return results.json();
    }).then(data=>{
      let cities = data.map((city) =>{
        return(
          {value: city.city_id, label: city.city_name}
        )
      });
      this.setState({cities_list: cities});
    });
  };

  // Sets state to selected city from filter
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

  // Sets state to selected method to sort by
  handleFaveSortChange(selectedSort) {
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

  // Set state to the selected fav value
  handleFavChange (selectedFavs){
    if (selectedFavs == null) {
      this.state.selectedFavs = {
        value: undefined,
        label: undefined
      };
    } else if (selectedFavs) {
      this.state.selectedFavs = selectedFavs;
      this.setState({selectedFavs: selectedFavs});
    }
    this.update();
  }

  // If no data is return from fetch call, print No Results message
  returnNoResults() {
    return (
      <div className="intro-text text-center bg-faded p-5 rounded">
          <span className="section-heading-upper text-center">No Results</span>
      </div>
    )
  }

  // Sends a new fetch call to the API with selected filters and sorts applied
  update () {
    var cityfilter = this.state.selectedCity.value;
    var sort = this.state.sort_attr;
    var sortby = this.state.sort_by;
    var favsfilter = this.state.selectedFavs.value;

    fetch('//api.espressoyoself.me/snapshots_filter_sort/?sort=snap_' + sort + '&sortby=' + sortby +'&cityfilter=' + cityfilter + '&favsfilter=' + favsfilter
      ).then(results => {
      console.log(results)
      return results.json();
    }).then(data => {
      this.fetchData(data);
    })
    this.setState({currentPage: 1})
  }

  // invokoed when user clicks a page number on the bottom.
  handleClick(pageNumber, arr, event) {
    if(pageNumber <= 1) {
      document.getElementById("prev").style.visibility="hidden";
    } else {
      document.getElementById("prev").style.visibility="visible";
    }

    if(pageNumber >= Math.ceil(arr.length / this.state.photosPerPage)) {
      document.getElementById("next").style.visibility="hidden";
    } else {
      document.getElementById("next").style.visibility="visible";
    }
      this.setState({
        currentPage: pageNumber
      });
  }

  render() {
    const { photos, currentPage, photosPerPage } = this.state;

    const concat_photos = [];
    const phots = this.state.photos.map((photos, index) => {
      if (photos) {
        concat_photos.push(photos)
      }
    });

    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = concat_photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    const pageNumbers = [];
    const nextPageNumbers = currentPage + 2 <= Math.ceil(concat_photos.length / photosPerPage)? currentPage + 2 : Math.ceil(concat_photos.length / photosPerPage)
    const prevPageNumber = currentPage - 1 >= 1 ? currentPage - 1: 1
    for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
      pageNumbers.push(i);
    }

    if (this.state.navigate) {
      return <Redirect to={{pathname: this.state.navigateTo, state: {snapshot: this.state.selectedSnapshot}}} push={true} />;
    }

    const renderPhotos = currentPhotos.map((photos, index) => {
      if (photos) {
        return <li key={index}>{photos}</li>;
      }
    });

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          style={this.state.currentPage === number ? {color:'orange'} : {}}
          onClick={this.handleClick.bind(this, number, concat_photos)}
        >
          {number}
        </li>
      );
    });

    const SelectPackage = require('react-select');
    const Select = SelectPackage.default;

    const {selectedCity} = this.state;
    const {selectedFavs} = this.state;
    const {selectedTag} = this.state;
    const {selectedSort} = this.state;

    const cityValue = selectedCity && selectedCity.value;
    const favsValue = selectedFavs && selectedFavs.value;
    const sortValue = selectedSort && selectedSort.value

    return (
      <div>
        <div className="filters-and-grid">
        <div className="filter-container-snaps">
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
            <h6>Filter by Faves</h6>
            <Select
                id="favsfilter"
                name="form-field-name"
                value={favsValue}
                onChange={this.handleFavChange.bind(this)}
                options={[
                  {value: '0', label: '0+'},
                  {value: '5', label: '5+'},
                  {value: '10', label: '10+'},
                ]}
            />
          </div>
          <div className="filter">
            <h6>Sort By</h6>
            <Select
              id="favssort"
              name="form-field-name"
              value={sortValue}
              onChange={this.handleFaveSortChange.bind(this)}
              options={[
                {value: 'favs/asc', label: 'Faves: Low - High'},
                {value: 'favs/desc', label: 'Faves: High - Low'}
              ]}
            />
          </div>
        </div>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <div className="row">
                  {renderPhotos}
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
          onClick={this.handleClick.bind(this, 1, concat_photos)}> &lt;&lt;
        </li>
        <li
          id="prev"
          style = {{visibility: "hidden"}}
          style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
          onClick={this.handleClick.bind(this, this.state.currentPage - 1, concat_photos)}> &lt;prev
        </li>
          {renderPageNumbers}
          <li
            id="next"
            style={this.state.currentPage >= Math.ceil(concat_photos.length / this.state.photosPerPage) ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, this.state.currentPage + 1, concat_photos)}> next&gt;
          </li>
          <li
            id=">>"
            style={this.state.currentPage  >= Math.ceil(concat_photos.length / this.state.photosPerPage) ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, Math.ceil(concat_photos.length / this.state.photosPerPage), concat_photos)}> &gt;&gt;
          </li>
        </ul>
        </div>
      </div>
    );
  }
}

export default SnapshotsMain;
