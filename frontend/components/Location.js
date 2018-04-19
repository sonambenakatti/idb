import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';


/* The instance page for scenic locations */

class Location extends Component {

	constructor (props) {
			super(props);
			this.state = {
				scenicloc: [],
				id: props.match.params.scenicId,
				shops_list: [],
				selectedShop: [],
				snaps_list: [],
				selectedSnapshot:[],
			};
			this.get_coffeeshops = this.get_coffeeshops.bind(this);
			this.get_snaps = this.get_snaps.bind(this);
			this.returnNoResults = this.returnNoResults.bind(this);

	};

	// Initial load of the data for the individual location instance
	componentDidMount(props) {
		fetch('/getsceniclocation/' + this.state.id).then(results =>{
			return results.json();
		}).then(data=>{
			let views = data.map((scenic) =>{
				this.setState({scenicloc: scenic});
			})
		})
	}

	// Get coffeshops nearby to the scenic location
	get_coffeeshops(){
		fetch('/nearby_shops_from_scenic/' + this.state.scenicloc.scenic_id).then(results =>{
			return results.json();
		}).then(data=>{
			let shops = data.map((shop) =>{
				return(
				 <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigateShop: true, navigateToShop: "/shop/" + shop.shop_id, selectedShop: shop})}}>
						<li className="col">
								<img src={shop.shop_picture} style={{width: 200, height: 200}} alt="Photo1"
								/>
								<span className="picTextInstance">
								<span><b>{shop.shop_name}</b></span></span>
						</li>
					</div>
				)
			})
			this.setState({shops_list: shops});
		})
	}

	// Get snapshots associated with the scenic location
	get_snaps(){
		fetch('/snapshots_scenic/'+ this.state.scenicloc.scenic_id).then(results =>{
			return results.json();
		}).then(data=>{
			let snapshots = data.map((snapshot) =>{
				return(

					<div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigateSnap: true, navigateTo: "/snapshot/" + snapshot.snap_id, selectedSnapshot: snapshot})}}>
						<li className="col">
								<img src={snapshot.snap_picture} style={{width: 200, height: 200}} alt="Photo1"/>
								<span className="picTextInstance"><span><b>{snapshot.snap_name}</b></span></span>
						</li>
					</div>
				);
			});
			if(data.length == 0) {
				let snapshots = [<div></div>, this.returnNoResults()];
				this.setState({snaps_list: snapshots});
			}
			else {
				let snapshots = data.map((snapshot) =>{
					return(
						<div id="snap_instance" key={snapshot.snap_name} onClick={() =>{this.setState({navigateSnap: true, navigateToSnap: "/snapshot/" + snapshot.snap_id, selectedSnapshot: snapshot})}}>
							<li className="col">
									<img src={snapshot.snap_picture} style={{width: 200, height: 200}} alt="Photo1"/>
									<span className="picTextInstance"><span><b>{snapshot.snap_name}</b></span></span>
							</li>
						</div>
					);
				});
			this.setState({snaps_list: snapshots});
			};
		});
	};

	// If no results are found for coffeeshops nearby or associated snapshots
	returnNoResults() {
		return (
			<div className="intro-text text-center bg-faded p-5 rounded">
					<span className="section-heading-upper text-center">There are no snaps for this view</span>
			</div>
		)
	}

	render() {
		if (this.state.navigateShop) {
			 var instance_state = {};
			 instance_state = {shop: this.state.selectedShop};

			 window.open(this.state.navigateToShop, "_blank");
			 this.setState({navigateShop: false})
		}
		else if (this.state.navigateSnap) {
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
									<span className="section-heading-upper">Scenic Location:</span>
									<span className="section-heading-lower">{this.state.scenicloc.scenic_name}</span>
								</h2>
							</div>
						</div>
					</div>
					<div className="product-item-description mr-auto">
						<div className="bg-faded p-5 rounded">
							<p className="mb-0"><b>Address: </b>{this.state.scenicloc.scenic_address}</p>
							<p className="mb-0"><b>Rating: </b>{this.state.scenicloc.scenic_rating}/5</p>
							<p className="mb-0"><b>Reviews:</b></p>
							<p className="mb-0">{this.state.scenicloc.scenic_review1}</p>
							<p className="mb-0"></p>
							<p className="mb-0">{this.state.scenicloc.scenic_review2}</p>
						</div>
					</div>
				</div>
				<div className="col-sm-5 instance-pic">
					<img className="product-item-img mx-auto rounded img-fluid mb-3 mb-lg-0" src={this.state.scenicloc.scenic_picture} alt={this.state.scenicloc.scenic_name} style={{width: 500, height: 500, marginTop: 50}} />
				</div>
				</div>
				<div className="model-links">
					<div class="row">
						<div className="col-md-6">
							<div className="text-center">
								<button id="coffee_nearby" className="btn" type="button" onClick={this.get_coffeeshops}>COFFEESHOPS NEARBY</button>
							</div>
						</div>
						<div className="col-md-6">
							<div className="text-center">
								<button id="more_snaps" className="btn" type="button" onClick={this.get_snaps}>MORE SNAPS</button>
							</div>
						</div>
					</div>
				</div>

					<div class="row justify-content-center">

						 <section className="col-md-6">
							 <div class="container text-center">
									<ul className="text-center img-list">
											{this.state.shops_list}
									</ul>
								</div>
						</section>

						 <section className="col-md-6">
							 <div class="container text-center">
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

export default Location;
