import React, { Component } from 'react';
import {Router, Route, RouteHandler} from 'react-router';
import WordCloud from 'react-d3-cloud';

import {
	ComposableMap,
	ZoomableGroup,
	Geographies,
	Geography,
	Markers,
	Marker,
} from "react-simple-maps"


const wrapperStyles = {
	width: "100%",
	margin: "0 auto",
}

const include = [
  "USA",
]


class Visualization extends Component {

		constructor (props) {
			super(props)

			this.state = {
			  parks_list: [],
				restaurants_list: [],
				cities_list: []
			};

		}

		componentDidMount(props) {
			fetch('http://api.roadtripr.fun/city?page=1&results_per_page=15').then(results =>{
				return results.json();
			}).then(data => {
				let cities = Object.values(data)[1].map((city) =>{
					let result = {"name": city.name, "latitude": city.latitude, "longitude": city.longitude};
					this.fetchRestaurants(result);
					this.fetchParks(result);
					return result;
				})
				// console.log(cities)
				this.setState({cities_list: cities});
			})

		}

		fetchRestaurants(city) {
			console.log(city)

			fetch('http://api.roadtripr.fun/restaurant/nearby/?latitude=' + parseFloat(city.latitude) +  '&longitude=' + parseFloat(city.longitude) + '&length=1').then(results =>{
				return results.json();
			}).then(data => {
				// console.log(data);


				let restaurants = Object.values(data)[0].map((restaurant) =>{
					return {"name": restaurant.name, "latitude": restaurant.latitude, "longitude": restaurant.longitude};
				})

				let new_restaurants = this.state.restaurants_list.concat(restaurants);
				this.setState({restaurants_list: new_restaurants});
				// console.log(this.state.restaurants_list);
			})
		}

		fetchParks(city) {
			fetch('http://api.roadtripr.fun/park/nearby/?latitude=' + parseFloat(city.latitude) +  '&longitude=' + parseFloat(city.longitude) + '&length=1').then(results =>{
				return results.json();
			}).then(data => {
				console.log(data)

				let parks = Object.values(data)[0].map((park) =>{
					return {"name": park.name, "latitude": park.latitude, "longitude": park.longitude};
				})
				let new_parks = this.state.parks_list.concat(parks);
				this.setState({parks_list: new_parks});
				// console.log(this.state.parks_list);
			})

		}

		createMap(markers) {
			return (
				<div style={wrapperStyles}>
					<ComposableMap
						projectionConfig={{ scale: 2500 }}
						width={2000}
						height={2000}
						style={{
							width: "100%",
							height: "auto",
						}}
						>
						<ZoomableGroup center={[ -95, 30 ]} disablePanning>
							<Geographies geography="static/world-50m.json">
								{(geographies, projection) =>
									geographies.map((geography, i) =>
										include.indexOf(geography.id) !== -1 && (
											<Geography
												key={i}
												geography={geography}
												projection={projection}
												style={{
													default: {
														fill: "#ECEFF1",
														stroke: "#607D8B",
														strokeWidth: 0.75,
														outline: "none",
													},
													hover: {
														fill: "#CFD8DC",
														stroke: "#607D8B",
														strokeWidth: 0.75,
														outline: "none",
													},
													pressed: {
														fill: "#FF5722",
														stroke: "#607D8B",
														strokeWidth: 0.75,
														outline: "none",
													},
												}}
											/>
										)
									)
								}
							</Geographies>
							<Markers>
								{markers.map((marker, i) => (
									<Marker
										key={i}
										marker={marker.mark}
										style={{
											default: { fill: marker.color },
											hover: { fill: marker.color },
											pressed: { fill: marker.color },
										}}
										>
										<circle
											cx={0}
											cy={0}
											r={12}
											style={{
												stroke: marker.color,
												strokeWidth: 3,
												opacity: 0.9,
											}}
										/>
										<text
											textAnchor="middle"
											y={marker.mark.markerOffset}
											style={{
												fontFamily: "Roboto, sans-serif",
												fill: "#607D8B",
											}}
											>
											{marker.mark.name}
										</text>
									</Marker>
								))}
							</Markers>
						</ZoomableGroup>
					</ComposableMap>
				</div>
			)
		}

		render() {
			const parks = this.state.parks_list;
			const restaurants = this.state.restaurants_list;

			const park_markers = parks.map((park) => {
				return {mark: {markerOffset: -25, name: park.name, coordinates: [park.longitude, park.latitude]}, color: "#FF5722"}
			});

			const restaurant_markers = restaurants.map((restaurant) => {
				return {mark: {markerOffset: 25, name: restaurant.name, coordinates: [restaurant.longitude, restaurant.latitude]}, color: "#339FFF"}
			});

			const markers = park_markers.concat(restaurant_markers);

			return this.createMap(markers);
		}
}

export default Visualization;
