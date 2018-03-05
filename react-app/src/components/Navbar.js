import React, { Component } from 'react';


class Navbar extends Component {


  render() {

    return (
      <div>
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
                <li className="nav-item active px-lg-4">
                  <a className="nav-link text-uppercase text-expanded" href="/">Home
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item px-lg-4">
                  <a id="shops" className="nav-link text-uppercase text-expanded" href="/shops">Coffee Shops</a>
                </li>
                <li className="nav-item px-lg-4">
                  <a id="scenicloc" className="nav-link text-uppercase text-expanded" href="/locations">Scenic Locations</a>
                </li>
                <li className="nav-item px-lg-4">
                  <a className="nav-link text-uppercase text-expanded" href="/snapshots">Snapshots</a>
                </li>
                <li className="nav-item px-lg-4">
                  <a className="nav-link text-uppercase text-expanded" href="/about">about</a>
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
