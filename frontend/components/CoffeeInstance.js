import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';


class CoffeeInstance extends Component {

	constructor(props) {
		super(props);
		this.state = {
			shop: [],
			id: props.match.params.shopId,
			scenic_list: [],
			selectedLocation: [],
			snaps_list: [],
			selectedSnapshot:[],
		};
		this.get_scenic = this.get_scenic.bind(this);
		this.get_snaps = this.get_snaps.bind(this);
		this.returnNoResults = this.returnNoResults.bind(this);
	}

componentDidMount(props) {
	fetch('/getcoffeeshop/' + this.state.id).then(results =>{
		return results.json();
	}).then(data=>{
		//console.log(data)
		let shops = data.map((shop) =>{
			this.setState({shop: shop});

		})
	})

}

	// Get scenic locations nearby the coffeeshop
	get_scenic(){
		fetch('/nearby_scenic_from_shops/' + this.state.shop.shop_id).then(results =>{
		return results.json();
	}).then(data => {
			//console.log(data)
			let views = data.map((scenicloc) =>{
				return(
					<div id="location_instance" key={scenicloc.scenic_name} onClick={() =>{this.setState({navigateScenic: true, navigateToScenic: "/location/" + scenicloc.scenic_id, selectedLocation: scenicloc})}}>
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

	// If not scenic locations nearby or associated snapshots
	returnNoResults() {
		return (
			<div className="intro-text text-center bg-faded p-5 rounded">
					<span className="section-heading-upper text-center">There are no more snaps for this shop</span>
			</div>
		)
	}
  // Get associated snapshots with coffeshop
  get_snaps(){
      console.log("IN SNAPS JS")
      fetch('/snapshots_shop/'+ this.state.shop.shop_id).then(results =>{
        return results.json();
      }).then(data=>{
        let snapshots= "";
         if(data.length == 0) {
            console.log("No results!");
            let snapshots= [<div></div>, this.returnNoResults()];
            this.setState({snaps_list: snapshots});
          }
          else {
            console.log("This is the data")
            console.log(data)
            let snapshots = data.map((snapshot) =>{
              return(
                <div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigateSnap: true, navigateToSnap: "/snapshot/" + snapshot.snap_id, selectedSnapshot: snapshot})}}>
                  <li className="col">
                      <img src={snapshot.snap_picture} style={{width: 200, height: 200}} alt="Photo1"/>
                      <span className="picTextInstance"><span><b>{snapshot.snap_name}</b><br /></span></span>
                  </li>
                </div>
              );
            });
            this.setState({snaps_list: snapshots});
        }
      });
    };
  render() {
    if (this.state.navigateScenic) {
       var instance_state = {};
       instance_state = {selectedLocation: this.state.selectedLocation};

       window.open(this.state.navigateToScenic, "_blank");
       this.setState({navigateScenic: false})
    }
    if (this.state.navigateSnap) {
       var instance_state = {};
       instance_state = {snapshot: this.state.selectedSnapshot};

			 window.open(this.state.navigateToSnap, "_blank");
			 this.setState({navigateSnap: false})
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
				<div className="row">
					<div className="col-md-6">
						<div className="text-center">
							<button id="scenic_nearby" className="btn" type="button" onClick={this.get_scenic}>SCENIC LOCATIONS NEARBY</button>
						</div>
					</div>
					<div className="col-md-6">
						<div className="text-center">
							<button id="more_snaps" className="btn" type="button" onClick={this.get_snaps}>MORE SNAPS</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row justify-content-center">
				 <section className="col-md-6">
					 <div className="container text-center">
							<ul className="text-center img-list">
									{this.state.scenic_list}
							</ul>
						</div>
				</section>
				 <section className="col-md-6">
					 <div className="container text-center">
							<ul className="text-center img-list">
									{this.state.snaps_list}
							</ul>
					</div>
				</section>
			</div>
		</div>

		);
	}
}

export default CoffeeInstance;
