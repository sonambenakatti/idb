import React, { Component } from 'react';

class CoffeeInstance extends Component {

  constructor(props) {

    super(props);
    console.log("4"+this.props.shop.shop_name);

    this.state = {
      shop: this.props.shop
    };
    console.log("5");
    console.log("state " + this.state.shop.shop_name)
  }
  componentDidMount() {
    console.log("6"+this.state.shop.shop_name);
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT " + nextProps.data)
    this.setState({ shop: nextProps.data });
  }

  componentWillUpdate() {
    console.log("Update")
  }

  render() {
      console.log("7");
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
              <p className="mb-0">Address: {this.state.shop.shop_address}</p>
              <p className="mb-0">Contact: {this.state.shop.shop_contact}</p>
              <p className="mb-0">Price: {this.state.shop.shop_price}</p>
              <p className="mb-0">Rating: {this.state.shop.shop_rating}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-5 instance-pic">
          <img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.shop.shop_picture} alt style={{width: 500, height: 500, marginTop: 50}} />
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
