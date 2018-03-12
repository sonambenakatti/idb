import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import CoffeeShops from './components/CoffeeShops';
import CoffeeInstance from './components/CoffeeInstance';
import Location from './components/Location';
import Locations from './components/Locations';
import SnapshotsMain from './components/SnapshotsMain';
import Scenic from './components/Scenic';


class App extends Component {

  constructor(props) {
        super(props);
        this.state = {
            instanceData: {}
        };
        this.coffeeShopCallback = this.coffeeShopCallback.bind(this)
  }

  coffeeShopCallback(shop) {
    console.log("1"+this.state.instanceData.shop_name);
    console.log("1 Setting State " + this.state.instanceData.shop_name)
    this.setState({instanceData : shop}, ()=>{console.log("2.5"+this.state.instanceData.shop_name)});
  }

  componentDidUpdate() {
    console.log("2"+this.state.instanceData.shop_name);
  }

render() {
  console.log("3"+this.state.instanceData.shop_name);
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shops' component={()=><CoffeeShops callbackParent={this.coffeeShopCallback}/>} />
          <Route path='/shop/:shopID' component={()=><CoffeeInstance shop={this.state.instanceData}/>} />
          <Route path='/about' component={About} />
          <Route path='/snapshots' component={SnapshotsMain} />
          <Route path='/locations' component={Locations} />
          <Route path='/location' component={Location} />
        </Switch>
      </div>
    </Router>
    );
  }



}

export default App;
