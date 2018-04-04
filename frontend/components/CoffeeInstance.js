import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';


class CoffeeInstance extends Component {

  constructor(props) {

    super(props);
    this.state = {
      shop: this.props.location.state.shop,
      scenic_list: [],
      selectedLocation: [],
      snaps_list: [],
      selectedSnapshot:[],
    };
    this.get_scenic = this.get_scenic.bind(this);
    this.get_snaps = this.get_snaps.bind(this);
  }

get_scenic(){
    fetch('/nearby_scenic_from_shops/' + this.state.shop.shop_id).then(results =>{
    console.log("Results:" + results)
    return results.json();
  }).then(data =>{
      console.log(data)
      let views = data.map((scenicloc) =>{
        return(
        <div id="location_instance" key={scenicloc.scenic_name} onClick={() =>{this.setState({navigateScenic: true, navigateTo: "/location", selectedLocation: scenicloc})}}>
          <li className="col">
              <img src={scenicloc.scenic_picture} style={{width: 200, height: 200}} alt="Photo1"
              />
              <span className="picTextInstance">
                <span><b>{scenicloc.scenic_name}</b></span>
              </span>
          </li>
        </div>
      )
    })
    this.setState({scenic_list: views});
  })
}

  get_snaps(){
    console.log("IN SNAPS JS")
    fetch('/snapshots_shop/'+ this.state.shop.shop_id).then(results =>{
    return results.json();
  }).then(data=>{
      console.log("This is the data")
      console.log(data)
      let snapshots = data.map((snapshot) =>{
        return(
          <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigateSnap: true, navigateTo: "/snapshot", selectedSnapshot: snapshot})}}>
            <li className="col">
                <img src={snapshot.snap_picture} style={{width: 200, height: 200}} alt="Photo1"/>
                <span className="picTextInstance"><span><b>{snapshot.snap_name}</b><br /></span></span>
            </li>
          </div>
        );
      });
      this.setState({snaps_list: snapshots});
      });
    };

  render() {
    if (this.state.navigateScenic) {
      console.log("IN METHOD")
       var instance_state = {};
       instance_state = {selectedLocation: this.state.selectedLocation};

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
                  <span className="section-heading-upper">Local Shop:</span>
                  <span className="section-heading-lower">{this.state.shop.shop_name}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="product-item-description mr-auto">
            <div className="bg-faded p-5 rounded">
              <span className="mb-0">
                <b id="address">Address: </b>{this.state.shop.shop_address}<br />
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
          <button id="scenic_nearby" className="btn btn-primary" type="button" onClick={this.get_scenic}>SCENIC LOCATIONS NEARBY</button>
          <button id="more_snaps" className="btn btn-primary" type="button" onClick={this.get_snaps}>MORE SNAPS</button>

        </div>
        <div>
         <section className="page-section-instance">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <div className="row">
                  {this.state.scenic_list}
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

export default CoffeeInstance;
