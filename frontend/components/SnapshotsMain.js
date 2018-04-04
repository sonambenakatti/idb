import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';

class SnapshotsMain extends Component {

    constructor(props) {
      super(props);
      this.state = {
        full_data: [],
        photos: [],
        navigate: false,
        selectedSnapshot: [],
        navigateTo: "",
        item: "",
        currentPage: 1,
        photosPerPage: 9,
        cities_list: [],
        selectedCity: '',
        selectedFavs: '',
        selectedTag: '',
        selectedSort: ''
      };
    };

    componentDidMount() {
      fetch('/getsnapshots').then(results =>{
        return results.json();
      }).then(data=>{
        console.log("This is the data")
        console.log(data)
        this.setState({full_data: data})
          let snapshots = data.map((snapshot) =>{
            return(
              <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
                <li className="col">
                    <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                    <span className="picText"><span><b>{snapshot.snap_name}</b><br /><br />
                    {snapshot.snap_tags}<br />
                    {snapshot.snap_favs+" Faves"}</span></span>
                </li>
              </div>
            );
          });
          this.setState({photos: snapshots});
          console.log("state", this.state.photos);
        });
        this.getCities();
    };

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
        });
        this.setState({cities_list: cities});
      });
    };

    handleCityChange(selectedCity){
      console.log("INSIDE HANDLE CITY");
      this.setState({ selectedCity });
      if (selectedCity === null) {
        this.resetToAllData();
      } else if (selectedCity) {
        var value = selectedCity.value;
        console.log(value);
        let snapshots = this.state.full_data.map((snapshot) =>{
          if (snapshot.city_id === value)
            return(
              <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
                <li className="col">
                    <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                    <span className="picText"><span><b>{snapshot.snap_name}</b><br /><br />
                    {snapshot.snap_tags}<br />
                    {snapshot.snap_favs+" Faves"}</span></span>
                </li>
              </div>
            );
        });
        this.setState({photos: snapshots});
      }
    }

    handleFaveSortChange(selectedSort) {
      this.setState({ selectedSort });
      if(selectedSort === null) {
        this.resetToAllData();
        console.log("Selected sort is null")
      } else if (selectedSort) {
          var value = selectedSort.value;
          if(value==="favsasc") {
            fetch('/snapshots/sort/favsasc').then(results => {
              console.log("In Favsasc, these are the json results")
              return results.json();
            }).then(data => {
                console.log("Data Faves Low-High")
                let snapshots = data.map((snapshot) => {
                  console.log("This is the snapshot")
                  console.log(snapshot)
                  return(
                    <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
                      <li className="col">
                          <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                          <span className="picText"><span><b>{snapshot.snap_name}</b><br /><br />
                          {snapshot.snap_tags}<br />
                          {snapshot.snap_favs+" Faves"}</span></span>
                      </li>
                    </div>
                  );
                })
                this.setState({photos: snapshots})
            })
          } else if (value === "favsdesc") {
            fetch('/snapshots/sort/favsdesc').then(results => {
              return results.json();
            }).then(data => {
                console.log(data)
                let snapshots = data.map((snapshot) => {
                  return(
                    <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
                      <li className="col">
                          <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                          <span className="picText"><span><b>{snapshot.snap_name}</b><br /><br />
                          {snapshot.snap_tags}<br />
                          {snapshot.snap_favs+" Faves"}</span></span>
                      </li>
                    </div>
                  );
                })
                this.setState({photos: snapshots})
            })
          }
      }
    }

    handleFavChange(selectedFavs){
      this.setState({ selectedFavs });
      if (selectedFavs === null) {
        this.resetToAllData();
      } else if (selectedFavs) {
        var value = selectedFavs.value;
        console.log(value);
        let snapshots = this.state.full_data.map((snapshot) =>{
          if (snapshot.snap_favs >= value)
            return(
              <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
                <li className="col">
                    <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                    <span className="picText"><span><b>{snapshot.snap_name}</b><br /><br />
                    {snapshot.snap_tags}<br />
                    {snapshot.snap_favs+" Faves"}</span></span>
                </li>
              </div>
            );
        });
        this.setState({photos: snapshots});
      }
    }

    resetToAllData() {
      let snapshots = this.state.full_data.map((snapshot) =>{
        return(
          <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
            <li className="col">
                <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                <span className="picText"><span><b>{snapshot.snap_name}</b><br /><br />
                {snapshot.snap_tags}<br />
                {snapshot.snap_favs+" Faves"}</span></span>
            </li>
          </div>
        );
      });
      this.setState({photos: snapshots});

    }

    // invokoed when user clicks a page number on the bottom.
    handleClick(pageNumber, event) {
      if(pageNumber <= 1) {
        document.getElementById("prev").style.visibility="hidden";
      } else {
        document.getElementById("prev").style.visibility="visible";
      }

      if(pageNumber >= Math.ceil(this.state.photos.length / this.state.photosPerPage)) {
        document.getElementById("next").style.visibility="hidden";
      } else {
        document.getElementById("next").style.visibility="visible";
      }
        this.setState({
          currentPage: pageNumber
        });
      }

    render() {
      console.log(this.state.photos);
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
      const nextPageNumbers = currentPage + 7 <= Math.ceil(concat_photos.length / photosPerPage)? currentPage + 7 : Math.ceil(concat_photos.length / photosPerPage)
      const prevPageNumber = currentPage - 2 >= 1 ? currentPage - 2: 1
      for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
        pageNumbers.push(i);
      }

      if (this.state.navigate) {
        console.log("REDIRCT" + this.state.selectedSnapshot.snap_username)
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
            onClick={this.handleClick.bind(this, number)}
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
      const tagValue = selectedTag && selectedTag.value;
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
              <h6>Filter by Faves</h6>
              <Select
                  name="form-field-name"
                  value={favsValue}
                  onChange={this.handleFavChange.bind(this)}
                  options={[
                    {value: '0', label: '0+'},
                    {value: '5', label: '5+'},
                    {value: '10', label: '10+'},
                    {value: '15', label: '15+'},
                    {value: '20', label: '20+'},
                  ]}
              />
            </div>
            <div className="filter">
              <h6>Choose an option to sort by</h6>
              <Select
                name="form-field-name"
                value={sortValue}
                onChange={this.handleFaveSortChange.bind(this)}
                options={[
                  {value: 'favsasc', label: 'Low-High'},
                  {value: 'favsdesc', label: 'High-Low'}
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

export default SnapshotsMain;
