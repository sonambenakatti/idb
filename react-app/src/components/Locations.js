import React, { Component } from 'react';
//import chunk from 'lodash.chunk';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';

class Locations extends Component {

constructor (props) {
    super(props);
    this.state = {
      locations: [],
      navigate: false,
      navigateTo: '',
      selectedLocation: [],
      navigateTo: "",
      item: ""
    };
};

componentDidMount(props) {
    fetch('/api/v1.0/sceniclocations').then(results =>{
      console.log(results)
      return results.json();
    }).then(data =>{
      console.log(data)
      let views = data.map((scenicloc) =>{
        return(
        <div key={scenicloc.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/scenic", selectedLocation: scenicloc})}}>
          <li className="col">
              <img src={scenicloc.scenic_picture} style={{width: 300, height: 300}} alt="Photo1"
              />
              <span className="picText"><span>Name {scenicloc.scenic_name}<br /><br />Address: {scenicloc.scenic_address}<br />Rating: {scenicloc.scenic_rating}</span></span>
          </li>
        </div>
      )
    })
    this.setState({locations: views});
  })
}

render() {

  if (this.state.navigate) {
    console.log(t"REDIRCT" + this.state.selectedLocation);
    return <Redirect to={{pathname: this.state.navigateTo, state: {selectedLocation: this.state.selectedLocation}}} push={true} />;
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
                  {this.state.locations}
                </div>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }


export default Locations;
