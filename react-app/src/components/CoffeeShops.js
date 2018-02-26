import React, { Component } from 'react';

class CoffeeShops extends Component {

render() {
    return (
      <div className = "CoffeeShops">
        {/*location dropdown*/}
        <div className="container">
          <div className="dropdown">
            <button id="city-btn" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" onclick="myFunction()">Choose City
              <span className="caret" /></button>
            <ul className="dropdown-menu">
              <input className="form-control" id="myInput" type="text" placeholder="Search.." />
              <li><a href="#">Austin, TX</a></li>
            </ul>
          </div>
        </div>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <li className="col">
                  <a href="/shops/{{coffeeId1}}">
                    <img src="" style={{width: 300, height: 300}} alt="Photo1" />
                    <span className="picText"><span> name <br /><br />location<br />Price:<br />Rating:</span></span>
                  </a>
                </li>
                <li className="col">
                  <a href="/shops/{{coffeeId2}}">
                    <img src="" style={{width: 300, height: 300}} alt="Photo2" />
                    <span className="picText"><span> name <br /><br />location<br />Price:<br />Rating:</span></span>
                  </a>
                </li>
                <li className="col">
                  <a href="/shops/{{coffeeId3}}">
                    <img src="" style={{width: 300, height: 300}} alt="Photo3" />
                    <span className="picText"><span> name <br /><br />location<br />Price:<br />Rating:</span></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CoffeeShops;
