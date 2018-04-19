import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


class Navbar extends Component {

	constructor (props) {
			super(props);
			this.state = {
				currentPage:""
			};
	};

	// Handle clicks on the navbar
	handleClick(event) {
			this.setState({
				currentPage: event.target.id
			});
		}

	render() {
		const pathname = window.location.href
		return (
			<div id="navbar">
				<h1 className="site-heading text-center text-white d-none d-lg-block">
					<span className="site-heading-lower">Coffee With A View</span>
				</h1>
				{/* Navigation */}
				<nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
					<div className="container">
						<a className="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none" href="#">ESPRESSO YOSELF</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarResponsive">
							<ul className="navbar-nav mx-auto">
								<li className="nav-item px-lg-4">
									<NavLink exact={true} id="home" className="nav-link text-uppercase text-expanded" to="/"
										activeClassName='active'
										style={(!pathname.includes("shop") && !pathname.includes("location") && !pathname.includes("snaps") && !pathname.includes("about") && !pathname.includes("search"))? {color:'orange'} : {}}
										onClick={this.handleClick.bind(this)}>Home
									</NavLink>
								</li>
								<li className="nav-item px-lg-4">
									<NavLink id="shops" className="nav-link text-uppercase text-expanded" to="/shops"
									activeClassName='active'
									style={pathname.includes("shop") ? {color:'orange'} : {}}
									onClick={this.handleClick.bind(this)}>Coffee Shops</NavLink>
								</li>
								<li className="nav-item px-lg-4">
									<NavLink id="scenicloc" className="nav-link text-uppercase text-expanded" to="/locations"
									activeClassName='active'
									style={pathname.includes("location") ? {color:'orange'} : {}}
									onClick={this.handleClick.bind(this)}>Scenic Locations</NavLink>
								</li>
								<li className="nav-item px-lg-4">
									<NavLink id="snaps"className="nav-link text-uppercase text-expanded" to="/snapshots"
									activeClassName='active'
									style={pathname.includes("snaps") ? {color:'orange'} : {}}
									onClick={this.handleClick.bind(this)}>Snapshots</NavLink>
								</li>
								<li className="nav-item px-lg-4">
									<NavLink id="about"className="nav-link text-uppercase text-expanded" to="/about"
									activeClassName='active'
									style={pathname.includes("about") ? {color:'orange'} : {}}
									onClick={this.handleClick.bind(this)}>About</NavLink>
								</li>
								<li className="nav-item px-lg-4">
									<NavLink id="search" className="nav-link text-uppercase text-expanded" to="/search"
									activeClassName='active'
									style={pathname.includes("search") ? {color:'orange'} : {}}
									onClick={this.handleClick.bind(this)}>Search</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
