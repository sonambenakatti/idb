import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';

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
        this.filterMenu();
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

    filterMenu() {
      let options = this.state.favoritesFilter.map((option) =>{
        return(
          <li><a href="#">{option}</a></li>
        )
      });
      this.setState({favoritesFilter: options});
    };

    // invokoed when user clicks a page number on the bottom.
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    // handle range
    handleRange(event) {
        this.setState({selectedRange: event.target.value});
    }

    render() {
      console.log(this.state.photos);
      const { photos, currentPage, photosPerPage } = this.state;

      const indexOfLastPhoto = currentPage * photosPerPage;
      const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
      const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(photos.length / photosPerPage); i++) {
        pageNumbers.push(i);
      }

      if (this.state.navigate) {
        console.log("REDIRCT" + this.state.selectedSnapshot.snap_username)
        return <Redirect to={{pathname: this.state.navigateTo, state: {snapshot: this.state.selectedSnapshot}}} push={true} />;
      }

      const renderPhotos = currentPhotos.map((photos, index) => {
        return <li key={index}>{photos}</li>;
      });

      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handleClick.bind(this)}
          >
            {number}
          </li>
        );
      });
      
      let filter_menu = []
      filter_menu = this.state.favoritesFilter.map((range) => {
        return (
          <option value={range}>range</option>
        );
      })

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
                {this.state.favoritesFilter}
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
            {renderPageNumbers}
          </ul>
          </div>
        </div>
      );
    }
  }

export default SnapshotsMain;
