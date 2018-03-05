import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import CoffeeShops from './components/CoffeeShops';
import Location from './components/Location';
import Locations from './components/Locations';
import SnapshotsMain from './components/SnapshotsMain';

class App extends Component {

render() {

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shops' component={CoffeeShops} />
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
