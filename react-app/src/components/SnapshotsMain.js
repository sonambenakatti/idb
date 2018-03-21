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
        item: ""
      };
    };

    componentDidMount() {
      fetch('//api.espressoyoself.me/snapshots').then(results =>{
        return results.json();
      }).then(data=>{
        console.log("This is the data")
        console.log(data)
          let snapshots = data.map((snapshot) =>{
            return(
              <div key={snapshot.snap_username} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
                <li className="col">
                    <img src={snapshot.snap_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                    <span className="picText"><span>Photographer Name:  {snapshot.snap_photographer}<br /><br />
                    Photographer username: {snapshot.snap_username}<br />Tags: {snapshot.snap_tags}<br />
                    Faves: {snapshot.snap_favs}</span></span>
                </li>
              </div>
            );
          });
          this.setState({photos: snapshots});
          console.log("state", this.state.photos);
        });
    };

    render() {
      console.log(this.state.photos);

      if (this.state.navigate) {
        console.log("REDIRCT" + this.state.selectedSnapshot.snap_username)
        return <Redirect to={{pathname: this.state.navigateTo, state: {snapshot: this.state.selectedSnapshot}}} push={true} />;
      }

      return (
        <div>
          {/*location dropdown*/}
          <div className="container">
            <div className="dropdown">
              <button id="city-btn" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" onclick="myFunction()">Choose City
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
                    {this.state.photos}
                  </div>
                </ul>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }

export default SnapshotsMain;
