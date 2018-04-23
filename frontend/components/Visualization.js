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
				restaurants_list: []
			};

		}

		componentDidMount(props) {
		  fetch('http://api.roadtripr.fun/park?page=1&results_per_page=30').then(results =>{
		    return results.json();
		  }).then(data => {
				let parks = Object.values(data)[1].map((park) =>{
		      return {"name": park.name, "latitude": park.latitude, "longitude": park.longitude};
		    })
				console.log(parks)
		    this.setState({parks_list: parks});
		  })

			fetch('http://api.roadtripr.fun/restaurant?page=1&results_per_page=30').then(results =>{
				return results.json();
			}).then(data => {
				let restaurants = Object.values(data)[1].map((restaurant) =>{
					return {"name": restaurant.name, "latitude": restaurant.latitude, "longitude": restaurant.longitude};
				})
				console.log(restaurants)
				this.setState({restaurants_list: restaurants});
			})

		}

		createMarkers(markers, fillColor) {
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
										marker={marker}
										style={{
											default: { fill: "#FF5722" },
											hover: { fill: "#FFFFFF" },
											pressed: { fill: "#FF5722" },
										}}
										>
										<circle
											cx={0}
											cy={0}
											r={10}
											style={{
												stroke: "#FF5722",
												strokeWidth: 3,
												opacity: 0.9,
											}}
										/>
										<text
											textAnchor="middle"
											y={marker.markerOffset}
											style={{
												fontFamily: "Roboto, sans-serif",
												fill: "#607D8B",
											}}
											>
											{marker.name}
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
				return {markerOffset: -25, name: park.name, coordinates: [park.longitude, park.latitude]}
			});


			return this.createMarkers(park_markers, "#607D8B");

		}
}

export default Visualization;
