import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import Highlighter from 'react-highlight-words';
import styles from '../../backend/static/css/highlighter.css'


class Search extends Component {

	constructor (props) {
		super(props);
		this.state = {
			searchValue: "",
			searchResults: [],
			resultsPerPage: 9,
			currentPage: 1,
			navigateTo: "",
			instanceType: "",
			selectedInstance: []
		};

		// This binding is necessary to make `this` work in the callback
		this.search = this.search.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
	};

	componentDidMount(props) {

	}

	// Performs search by sending fetch call to API and rendering results of data
	search() {
		this.setState({searchResults: []});
		this.setState({currentPage: 1});
		fetch('/search/' + this.state.searchValue).then(results => {
			return results.json();
		}).then(data => {
			let results = data.map((result) => {
				// Handle differences between the three models
				if(result["shop_name"] !== undefined) {
					return this.returnCoffeeShop(result);
				} else if (result["scenic_name"] !== undefined) {
					return this.returnScenicLocation(result);
				} else if (result["snap_name"] !== undefined) {
					return this.returnSnapshot(result);
				} else {
					console.log("else " + result);
				}
			})
			if(data.length == 0) {
				results = [<div></div>, this.returnNoResults()];
			}
			this.setState({searchResults: results});
		})
	}

	// Returns all coffeshops from results of search
	returnCoffeeShop(result) {
		return(
				<div id="shop_instance" onClick={() =>{this.setState({navigate: true, navigateTo: "/shop/" + result.shop_id, selectedInstance: result, instanceType: "CoffeeInstance"})}}>
					<li className="col">
							<img src={result.shop_picture} style={{width: 300, height: 300}}/>
							<div class="centered">
								<span><nobr><b>{this.highlightText(result.shop_name)}</b></nobr>
								<br /><br />{this.highlightText(result.shop_address)}
								<br />{this.highlightText(result.shop_price)}<br />
								{this.highlightText(result.shop_rating + "/5")}</span>
							</div>
					</li>
				</div>
		);
	}

	// Highlights the text searched by
	highlightText(text) {
		return (
			<Highlighter
				 highlightClassName={styles.Highlight}
				 highlightStyle={{ color: 'white' }}
				 searchWords = {this.state.searchValue.split(" ")}
				 autoEscape={false}
				 textToHighlight= {text}
			/>
		)
	}

	// Returns scenic locations from results of search
	returnScenicLocation(result) {
		if(result.scenic_picture === "") {
			result.scenic_picture = "/static/img/noLocationImage.png"
		}
		return(
			<div id="location_instance" key={result.scenic_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/location/" + result.scenic_id, selectedInstance: result, instanceType: "Location"})}}>
				<li className="col">
						<img src={result.scenic_picture} style={{width: 300, height: 300}}/>
						<div class="centered">
							<span><b>{this.highlightText(result.scenic_name)}</b>
							<br /><br />{this.highlightText(result.scenic_address)}
							<br />{this.highlightText(result.scenic_rating + "/5")}
							</span>
						</div>
				</li>
			</div>
		);
	}

	// Returns snapshots from results of search
	returnSnapshot(result) {
		return(
			<div id="snap_instance" key={result.snap_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/snapshot/" + result.snap_id, selectedInstance: result, instanceType: "Snapshot"})}}>
				<li className="col">
						<img src={result.snap_picture} style={{width: 300, height: 300}}/>
						<div class="centered">
						<span><b>{this.highlightText(result.snap_name)}</b><br /><br />
						Photographer: {this.highlightText(result.snap_photographer)}<br />
						{this.highlightText(result.snap_favs + " Faves")}</span>
						</div>
				</li>
			</div>
		);
	}

	// If no data is return from fetch call, print No Results message
	returnNoResults() {
		return (
			<div className="intro-text text-center bg-faded p-5 rounded">
					<span className="section-heading-upper text-center">No search results found for {this.state.searchValue}</span>
			</div>
		)
	}

	handleClick(pageNumber, event) {
			if(pageNumber <= 1) {
				document.getElementById("prev").style.visibility="hidden";
			} else {
				document.getElementById("prev").style.visibility="visible";
			}
			if(pageNumber >= Math.ceil(this.state.searchResults.length / this.state.resultsPerPage)) {
				document.getElementById("next").style.visibility="hidden";
			} else {
				document.getElementById("next").style.visibility="visible";
			}
			this.setState({
				currentPage: pageNumber
			});
		}

	handleSearch(event) {
		event.preventDefault();
		this.search();
	}

	render() {
		 const{searchResults, currentPage, resultsPerPage} = this.state;
		 const indexOfLastResult = currentPage * resultsPerPage;
		 const indexOfFirstResult = indexOfLastResult - resultsPerPage;
		 const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

		 const pageNumbers = [];
		 const nextPageNumbers = currentPage + 2 <= Math.ceil(searchResults.length / resultsPerPage)? currentPage + 2 : Math.ceil(searchResults.length / resultsPerPage)
		 const prevPageNumber = currentPage - 1 >= 1 ? currentPage - 1: 1
		 for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
			 pageNumbers.push(i);
		 }

		 if (this.state.navigate) {
			 var instanceType = this.state.instanceType;
			 var instance_state = {};

			 // Need to account for different variable names within the instance pages
			 if(instanceType === "CoffeeInstance") {
				 instance_state = {shop: this.state.selectedInstance};
			 } else if(instanceType === "Location") {
				 instance_state = {selectedLocation: this.state.selectedInstance};
			 } else {
				 instance_state = {snapshot: this.state.selectedInstance};
			 }
			 window.open(this.state.navigateTo, "_blank");
			 this.setState({navigate: false})
		 }

		const renderResults = currentResults.map((res, index) => {
			return <li key={index}>{res}</li>;
		});

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<li
					key={number}
					id={number}
					style={this.state.currentPage === number ? {color:'orange'} : {}}
					onClick={this.handleClick.bind(this, number)}
				>
					{number}
				</li>
			);
		});

		return (
			<div>
				<section className="page-section-1">
					<div className="search">
						<form>
							<input className = "search-input" value={this.state.inputValue} type="text" name="search" onChange={evt => this.updateInputValue(evt) } autoFocus/>
							<button type="submit" className="btn-lg" onClick={this.handleSearch.bind(this)}>Search</button>
						</form>
					</div>
				</section>
				<section className="page-section-1">
					<div className="container">
						<div className="row">
							<ul className="img-list">
								<div className="row">
									{renderResults}
								</div>
							</ul>
						</div>
					</div>
				</section>
				<section className="page-section-1">
					<div className="col-md-12 text-center">
					<ul className="page-list">
						<li
							id="<<"
							style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
							onClick={this.handleClick.bind(this, 1)}> &lt;&lt;
						</li>
						<li
							id="prev"
							style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
							onClick={this.handleClick.bind(this, this.state.currentPage - 1)}> &lt;prev
						</li>
							{renderPageNumbers}
						<li
							id="next"
							style={this.state.currentPage >= Math.ceil(this.state.searchResults.length / this.state.resultsPerPage) ? {visibility:'hidden'} : {}}
							onClick={this.handleClick.bind(this, this.state.currentPage + 1)}> next&gt;
						</li>
						<li
							id=">>"
							style={this.state.currentPage  >= Math.ceil(this.state.searchResults.length / this.state.resultsPerPage) ? {visibility:'hidden'} : {}}
							onClick={this.handleClick.bind(this, Math.ceil(this.state.searchResults.length / this.state.resultsPerPage))}> &gt;&gt;
						</li>
					</ul>
					</div>
				</section>
			</div>
		);
	}

	updateInputValue(evt) {
		this.setState({
			searchValue: evt.target.value
		});
	}

}

export default Search;
