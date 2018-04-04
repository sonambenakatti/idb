import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';


/* The instance page for scenic locations */

class Location extends Component {

  constructor (props) {
      super(props);
      console.log(this.props.location.state.selectedLocation.scenic_address);
      this.state = {
        address: this.props.location.state.selectedLocation.scenic_address,
        name: this.props.location.state.selectedLocation.scenic_name,
        photo: this.props.location.state.selectedLocation.scenic_picture,
        rating: this.props.location.state.selectedLocation.scenic_rating,
        review1: this.props.location.state.selectedLocation.scenic_review1,
        review2: this.props.location.state.selectedLocation.scenic_review2,
        scenic_id: this.props.location.state.selectedLocation.scenic_id,
        shops_list: [],
        selectedShop: [],
        snaps_list: [],
        selectedSnapshot:[],
      };
      console.log(this.state);
      this.get_coffeeshops = this.get_coffeeshops.bind(this);
      this.get_snaps = this.get_snaps.bind(this);
  };

  componentDidMount(props) {

  }

  get_coffeeshops(){
    console.log(this.state.scenic_id)
    fetch('/nearby_shops_from_scenic/' + this.state.scenic_id).then(results =>{
    console.log("Results:" + results)
    return results.json();
  }).then(data=>{
    console.log(data)
    let shops = data.map((shop) =>{
      return(
       <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigateShop: true, navigateTo: "/shop", selectedShop: shop})}}>
          <li className="col">
              <img src={shop.shop_picture} style={{width: 200, height: 200}} alt="Photo1"
              />
              <span className="picTextInstance">
              <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
          </li>
        </div>
      )
    })
    this.setState({shops_list: shops});
  })
}

  get_snaps(){
    console.log("IN SNAPS JS")
    fetch('/snapshots_scenic/'+ this.state.scenic_id).then(results =>{
    return results.json();
  }).then(data=>{
      console.log("This is the data")
      console.log(data)
      let snapshots = data.map((snapshot) =>{
        return(
          <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigateSnap: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
            <li className="col">
                <img src={snapshot.snap_picture} style={{width: 200, height: 200}} alt="Photo1"/>
                <span className="picTextInstance"><span><b>{snapshot.snap_name}</b><br /><br />
                {snapshot.snap_tags}<br />
                {snapshot.snap_favs+" Faves"}</span></span>
            </li>
          </div>
        );
      });
      this.setState({snaps_list: snapshots});
      });
    };




  render() {
    if (this.state.navigateShop) {
      console.log("IN METHOD")
       var instance_state = {};
       instance_state = {shop: this.state.selectedShop};

       return <Redirect to={{pathname: this.state.navigateTo, state: instance_state}} push={true} />;
    }
    if (this.state.navigateSnap) {
      console.log("IN METHOD")
       var instance_state = {};
       instance_state = {snapshot: this.state.selectedSnapshot};

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
                  <span className="section-heading-upper">Scenic Location:</span>
                  <span className="section-heading-lower">{this.state.name}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="product-item-description mr-auto">
            <div className="bg-faded p-5 rounded">
              <p className="mb-0"><b>Address: </b>{this.state.address}</p>
              <p className="mb-0"><b>Rating: </b>{this.state.rating}/5</p>
              <p className="mb-0"><b>Reviews:</b></p>
              <p className="mb-0">{this.state.review1}</p>
              <p className="mb-0"></p>
              <p className="mb-0">{this.state.review2}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-5 instance-pic">
          <img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.photo} alt={this.state.name} style={{width: 500, height: 500, marginTop: 50}} />
        </div>
        </div>
        <div className="model-links">
          <button id="coffee_nearby" className="btn btn-primary" type="button" onClick={this.get_coffeeshops}>COFFEESHOPS NEARBY</button>
          <button id="more_snaps" className="btn btn-primary" type="button" onClick={this.get_snaps}>MORE SNAPS</button>

        </div>
        <div>
         <section className="page-section-instance">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <div className="row">
                  {this.state.shops_list}
                </div>
              </ul>
            </div>
          </div>
        </section>
        </div>

        <div>
         <section className="page-section-instance">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <div className="row">
                  {this.state.snaps_list}
                </div>
              </ul>
            </div>
          </div>
        </section>
        </div>
      </div>
    );
  }
}

export default Location;
