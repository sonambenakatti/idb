import React, { Component } from 'react';

class CoffeeInstance extends Component {

  constructor(props) {
    super(props);
    console.log("coffeeshops[]")
    console.log(this.props.location.state);
    this.state = {
      name: this.props.location.state.selectedShop.name,
      photo: this.props.location.state.selectedShop.photo,
      phone: this.props.shop.location.selectedShop.phone,
      price: this.props.shop.location.selectedShop.price,
      rating: this.props.shop.location.selectedShop.rating,
      address: this.props.shop.location.selectedShop.location,
    };
  }


  render() {
      console.log("name of shop:")
      console.log(this.state.name);
      return (
      <div>
      <div className="content">
        <div className="col-sm-5 instance-details">
          <div className="product-item">
            <div className="product-item-title">
              <div className="bg-faded p-5 d-flex ml-auto rounded">
                <h2 className="section-heading mb-0">
                  <span className="section-heading-upper">Local Shop:</span>
                  <span className="section-heading-lower">{this.state.name}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="product-item-description mr-auto">
            <div className="bg-faded p-5 rounded">
              <p className="mb-0">Address: {this.state.address}</p>
              <p className="mb-0">Contact: {this.state.phone}</p>
              <p className="mb-0">Price: {this.state.price}</p>
              <p className="mb-0">Rating: {this.state.rating}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-5 instance-pic">
          <img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.photo} alt style={{width: 500, height: 500, marginTop: 50}} />
        </div>
      </div>
      <div className="model-links">
        <p><a href="/scenic">LOCATIONS NEARBY </a></p>
        <p><a href="/snapshots">MORE SNAPS</a></p>
      </div>
    </div>

      );
    }
}

export default CoffeeInstance;
