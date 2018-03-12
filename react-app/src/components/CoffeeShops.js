import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';

class CoffeeShops extends Component {

constructor (props) {
  super(props);
  this.state = {
    coffeeshops: [],
    navigate: false,
    selectedShop: [],
    navigateTo: "",
    item: ""
  };
};

componentDidMount(props) {
  fetch('/api/v1.0/coffeeshops').then(results =>{
    console.log(results)
    return results.json();
  }).then(data=>{
    console.log(data)
    let shops = data.map((shop) =>{
      return(
        <div key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
          <li className="col">
              <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"
              />
              <span className="picText"><span>Name {shop.shop_name}<br /><br />Address: {shop.shop_address}<br />Price: {shop.shop_price}<br />Rating: {shop.shop_rating}</span></span>
          </li>
        </div>
      )
    })
    this.setState({coffeeshops: shops});
  })
}

render() {
    if (this.state.navigate) {
      console.log("REDIRCT" + this.state.selectedShop.shop_name)
      return <Redirect to={{pathname: this.state.navigateTo, state: {shop: this.state.selectedShop}}} push={true} />;
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
                  {this.state.coffeeshops}
                </div>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CoffeeShops;
