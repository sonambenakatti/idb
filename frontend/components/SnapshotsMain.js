import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';

class SnapshotsMain extends Component {

    constructor(props) {
      super(props);
      this.state = {
        photos: [],
        navigate: false,
        selectedSnapshot: [],
        navigateTo: "",
        item: "",
        currentPage: 1,
        photosPerPage: 9,
        cities_list: [],
        selectedRange: "",
        favoritesFilter: ["1-5", "5-10", "10-20", "20+"]
      };
    };

    componentDidMount() {
      fetch('/getsnapshots').then(results =>{
        return results.json();
      }).then(data=>{
        console.log("This is the data")
        console.log(data)
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
            <li><a href="#">{city.city_name}</a></li>
          )
        });
        this.setState({cities_list: cities});
      });
    };

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

      const indexOfLastPhoto = currentPage * photosPerPage;
      const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
      const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

      const pageNumbers = [];
      const nextPageNumbers = currentPage + 7 <= Math.ceil(photos.length / photosPerPage)? currentPage + 7 : Math.ceil(photos.length / photosPerPage)
      const prevPageNumber = currentPage - 2 >= 1 ? currentPage - 2: 1
      for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
        pageNumbers.push(i);
      }

      if (this.state.navigate) {
        console.log("REDIRCT" + this.state.selectedSnapshot.snap_username)
        return <Redirect to={{pathname: this.state.navigateTo, state: {snapshot: this.state.selectedSnapshot}}} push={true} />;
      }

      const renderPhotos = currentPhotos.map((photos, index) => {
        return <li key={index}>{photos}</li>;
      });

      const renderRanges = this.state.favoritesFilter.map((option, index) => {
        return <li key={index}><a href="#">{option}</a></li>;
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
          {/*location dropdown*/}
          <div className="filters-and-grid">
          <div className="filter-container">
            <div className="dropdown">
              <button id="city-btn" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Choose a City to Explore
                <span className="caret" /></button>
              <ul className="dropdown-menu" x-placement="bottom-start">
                {this.state.cities_list}
              </ul>
            </div>
            <div className="dropdown">
              <button id="fave-btn" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Filter by number of favorites
                <span className="caret" /></button>
              <ul className="dropdown-menu">
                {renderRanges}
              </ul>
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
