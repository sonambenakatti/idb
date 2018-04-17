import React, { Component } from 'react';
import {Router, Route, RouteHandler} from 'react-router';
import WordCloud from 'react-d3-cloud';

class Visualization extends Component {

    constructor (props) {
      super(props)

      this.state = {
        restaurants_list: []
      };

    }

    componentDidMount(props) {
      fetch('http://api.roadtripr.fun/restaurant/top?city=Austin&length=30').then(results =>{
        console.log(results)
        return results.json();
      }).then(data => {
        console.log(data)
        let restaurants = Object.values(data)[0].map((restaurant) =>{
          return restaurant.name;
        })
        this.setState({restaurants_list: restaurants});
      })
    }

    render() {
      var data = [];
      let restaurants = this.state.restaurants_list;
      var i = 0;
      for (i = 0; i < restaurants.length; i++) {
          data.push({text: restaurants[i], value: Math.floor((Math.random() * 1000) + 1)});
      }

      // const data = [
      //   { text: 'Hey', value: 1000 },
      //   { text: 'lol', value: 200 },
      //   { text: 'first impression', value: 800 },
      //   { text: 'very cool', value: 1000000 },
      //   { text: 'duck', value: 10 },
      // ];

      console.log(data)

      const fontSizeMapper = word => Math.log2(word.value) * 5;
      const rotate = word => word.value % 360;


      return (
        <WordCloud
              data={data}
              fontSizeMapper={fontSizeMapper}
              rotate={rotate}
            />
      );
  }

}

export default Visualization;
