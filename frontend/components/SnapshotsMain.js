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
        photosPerPage: 3
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
    };

    // invokoed when user clicks a page number on the bottom.
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
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

      return (
        <div>
          {/*location dropdown*/}
          <div className="container">
            <div className="dropdown">
              <button id="city-btn" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Choose City
                <span className="caret" /></button>
              <ul className="dropdown-menu">
                <input className="form-control" id="myInput" type="text" placeholder="Search.." />
                <li><a href="#">Austin, TX</a></li>
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
