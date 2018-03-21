import React, { Component } from 'react';

class Snapshot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      snapshot: this.props.location.state.snapshot
    };
    console.log("This is photo")
    console.log(this.state.snapshot)
  };

  render() {
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
                <p className="mb-0">Photographer name: {this.state.snapshot.snap_photographer}</p>
                <p className="mb-0">Username: {this.state.snapshot.snap_username}</p>
                <p className="mb-0">Tags: {this.state.snapshot.snap_tags}</p>
                <p className="mb-0">Faves: {this.state.snapshot.snap_favs}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-5 instance-pic">
            <img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.snapshot.snap_picture} alt style={{width: 500, height: 500, marginTop: 50}} />
          </div>
        </div>
        <div className="model-links">
          <p><a href="/locations">LOCATIONS NEARBY</a></p>
          <p><a href="/shops">COFFEE SHOPS NEARBY</a></p>
        </div>
        </div>

      );
    }
  }

export default Snapshot;
