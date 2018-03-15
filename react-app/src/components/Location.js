import React, { Component } from 'react';

/* The instance page for scenic locations */

class Location extends Component {

  constructor (props) {
      super(props);
      this.state = {
        address: this.props.location.state.selectedLocation.scenic_address,
        name: this.props.location.state.selectedLocation.scenic_name,
        photo: this.props.location.state.selectedLocation.scenic_picture,
        rating: this.props.location.state.selectedLocation.scenic_rating,
      };
      console.log(this.state);
  };

  // componentDidMount() {
  //
  // }

  render() {

    return (
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
              <p className="mb-0">Address: {this.state.address}</p>
              <p className="mb-0">Rating: {this.state.rating}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-5 instance-pic">
          <img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.photo} alt={this.state.name} style={{width: 500, height: 500, marginTop: 50}} />
        </div>
      </div>
    );
  }
}

export default Location;
