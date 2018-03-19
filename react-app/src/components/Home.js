import React, { Component } from 'react';

class Home extends Component {

    render() {
      return (

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <p><a href="/shops"><img className="d-block w-100" src="/static/img/coffee1.jpg" alt="First slide" /></a></p>
              <div className="carousel-caption d-none d-md-block">
                <h3>Coffee Shop</h3>
                <p>Browse through local coffee shops.</p>
              </div>
            </div>
            <div className="carousel-item">
              <p><a href="/locations"><img className="d-block w-100" src="/static/img/coffee2.jpg" alt="Second slide" /></a></p>
              <div className="carousel-caption d-none d-md-block">
                <h3>Scenic Views</h3>
                <p>Click through stunning locations.</p>
              </div>
            </div>
            <div className="carousel-item">
              <p><a href="/snapshots"><img className="d-block w-100" src="/static/img/coffee3.jpg" alt="Third slide" /></a></p>
              <div className="carousel-caption d-none d-md-block">
                <h3>Snapshots</h3>
                <p>Find crystal clear snaps of your two favorite things.</p>
              </div>
            </div>
          </div>
          {/*Left and Right arrows*/}
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      );
    }
}

export default Home;
