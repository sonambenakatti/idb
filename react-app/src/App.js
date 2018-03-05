import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import CoffeeShops from './components/CoffeeShops';
import Scenic from './components/Scenic';
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
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
