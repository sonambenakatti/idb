import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';


class Snapshot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      snapshot: this.props.location.state.snapshot,
      selectedShop: [],
      shop:[],

    };
    console.log("This is photo")
    console.log(this.state.snapshot)
    this.go_to_instance = this.go_to_instance.bind(this);
  };


  go_to_instance(){
    if(this.state.snapshot.shop_id != null){
      fetch("/getcoffeeshop/" + this.state.snapshot.shop_id).then(results =>{
      console.log("Results:" + results)
      return results.json();
       }).then(data=>{
        console.log(data)
        let shops = data.map((shop) =>{
          this.setState({navigateShop: true, navigateTo: "/shop", selectedShop: shop})

        })
      })

    }

    else if(this.state.snapshot.scenic_id != null){
      fetch("/getsceniclocation/" + this.state.snapshot.scenic_id).then(results =>{
      console.log("Results:" + results)
      return results.json();
       }).then(data=>{
        console.log(data)
        let views = data.map((scenicloc) =>{
          this.setState({navigateScenic: true, navigateTo: "/location", selectedLocation: scenicloc})

        })
      })

    }
  }



  render() {
    if (this.state.navigateShop) {
      console.log("IN METHOD")
       var instance_state = {};
       instance_state = {shop: this.state.selectedShop};

       return <Redirect to={{pathname: this.state.navigateTo, state: instance_state}} push={true} />;
    }
     if (this.state.navigateScenic) {
      console.log("IN METHOD")
       var instance_state = {};
       instance_state = {selectedLocation: this.state.selectedLocation};

       return <Redirect to={{pathname: this.state.navigateTo, state: instance_state}} push={true} />;
    }
      return (
      <div>
        <div className="content">
          <div className="col-sm-5 instance-details">
            <div className="product-item">
              <div className="product-item-title">
                <div className="bg-faded p-5 d-flex ml-auto rounded">
                  <h2 className="section-heading mb-0">
                    <span className="section-heading-upper">Snapshot: </span>
                    <span className="section-heading-lower">{this.state.snapshot.snap_name}</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="product-item-description mr-auto">
              <div className="bg-faded p-5 rounded">
                <p className="mb-0"><b>Photographer name: </b>{this.state.snapshot.snap_photographer}</p>
                <p className="mb-0"><b>Username: </b>{this.state.snapshot.snap_username}</p>
                <p className="mb-0"><b>Tags: </b>{this.state.snapshot.snap_tags}</p>
                <p className="mb-0"><b>Faves: </b>{this.state.snapshot.snap_favs}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-5 instance-pic">
            <img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.snapshot.snap_picture} alt style={{width: 500, height: 500, marginTop: 50}} />
          </div>
        </div>
        <div className="model-links">
          <button id="more_snaps" className="btn" type="button" onClick={this.go_to_instance}>LEARN MORE ABOUT THIS PLACE</button>
        </div>
        </div>

      );
    }
  }

export default Snapshot;
