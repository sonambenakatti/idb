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
	maxWidth: 980,
	margin: "0 auto",
}

const include = [
	"ARG", "BOL", "BRA", "CHL", "COL", "ECU",
	"GUY", "PRY", "PER", "SUR", "URY", "VEN",
]

const markers = [
	{ markerOffset: -25, name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
	{ markerOffset: -25, name: "La Paz", coordinates: [-68.1193, -16.4897] },
	{ markerOffset: 35, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
	{ markerOffset: 35, name: "Santiago", coordinates: [-70.6693, -33.4489] },
	{ markerOffset: 35, name: "Bogota", coordinates: [-74.0721, 4.7110] },
	{ markerOffset: 35, name: "Quito", coordinates: [-78.4678, -0.1807] },
	{ markerOffset: -25, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
	{ markerOffset: -25, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
	{ markerOffset: 35, name: "Paramaribo", coordinates: [-55.2038, 5.8520] },
	{ markerOffset: 35, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
	{ markerOffset: -25, name: "Caracas", coordinates: [-66.9036, 10.4806] },
]


class Visualization extends Component {

		constructor (props) {
			super(props)

			// this.state = {
			//   restaurants_list: []
			// };

		}

		// componentDidMount(props) {
		//   fetch('http://api.roadtripr.fun/restaurant/top?city=Austin&length=30').then(results =>{
		//     console.log(results)
		//     return results.json();
		//   }).then(data => {
		//     console.log(data)
		//     let restaurants = Object.values(data)[0].map((restaurant) =>{
		//       return restaurant.name;
		//     })
		//     this.setState({restaurants_list: restaurants});
		//   })
		// }

		render() {
			return (
				<div style={wrapperStyles}>
					<ComposableMap
						projectionConfig={{ scale: 800 }}
						width={1000}
						height={1000}
						style={{
							width: "100%",
							height: "auto",
						}}
						>
						<ZoomableGroup center={[ -60, -25 ]} disablePanning>
							<Geographies geography="backend/static/world-50m.json">
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

	//   render() {
	//     var data = [];
	//     let restaurants = this.state.restaurants_list;
	//     var i = 0;
	//     for (i = 0; i < restaurants.length; i++) {
	//         data.push({text: restaurants[i], value: Math.floor((Math.random() * 10000) + 1)});
	//     }
	//
	//     console.log(data)
	//
	//     const fontSizeMapper = word => Math.log2(word.value) * 5;
	//     const rotate = word => (word.value % 90) - 45;
	//
	//
	//     return (
	//       <WordCloud
	//             data={data}
	//             fontSizeMapper={fontSizeMapper}
	//             rotate={rotate}
	//           />
	//     );
	// }

}

export default Visualization;
