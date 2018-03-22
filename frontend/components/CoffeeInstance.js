import React, { Component } from 'react';

class CoffeeInstance extends Component {

  constructor(props) {

    super(props);
    this.state = {
      shop: this.props.location.state.shop
    };
  }


  render() {
      return (
      <div>
      <div className="content">
        <div className="col-sm-5 instance-details">
          <div className="product-item">
            <div className="product-item-title">
              <div className="bg-faded p-5 d-flex ml-auto rounded">
                <h2 className="section-heading mb-0">
                  <span className="section-heading-upper">Local Shop:</span>
                  <span className="section-heading-lower">{this.state.shop.shop_name}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="product-item-description mr-auto">
            <div className="bg-faded p-5 rounded">
              <span className="mb-0">
                <b>Address: </b>{this.state.shop.shop_address}<br />
                <b>Contact: </b>{this.state.shop.shop_contact}<br />
                <b>Price: </b>{this.state.shop.shop_price}<br />
                <b>Rating: </b>{this.state.shop.shop_rating}<br />
              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-5 instance-pic">
          <img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.shop.shop_picture} alt style={{width: 500, height: 500, marginTop: 50}} />
        </div>
      </div>
      <div className="model-links">
        <p><a href="/locations">LOCATIONS NEARBY</a></p>
        <p><a href="/snapshots">MORE SNAPS</a></p>
      </div>
    </div>

      );
    }
}

export default CoffeeInstance;
