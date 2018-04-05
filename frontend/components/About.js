import React, { Component } from 'react';

class About extends Component {

constructor(props) {
  super(props)

  this.state = {
    commits: {"sonambenakatti": 0, "AmruthaSreedharane": 0, "jenniferrethi": 0, "GohJazn": 0, "ruchi-shekar": 0, "total": 0},
    issues: {"sonambenakatti": 0, "AmruthaSreedharane": 0, "jenniferrethi": 0, "GohJazn": 0, "ruchi-shekar": 0, "total": 0},
    ready: false
  };
}

componentDidMount() {
  this.loadCommits();
  this.loadIssues();
}

loadCommits() {
  fetch('https://api.github.com/repos/sonambenakatti/idb/stats/contributors')
  			.then(response => response.json())
  			.then(data => {
          let actualCommits = {"sonambenakatti": 0, "AmruthaSreedharane": 0, "jenniferrethi": 0, "GohJazn": 0, "ruchi-shekar": 0, "total": 0};
          let total = 0;
          for (let i = 0; i < data.length; i++) {
            actualCommits[data[i].author.login] = data[i].total;
            total += data[i].total;
          }
          actualCommits["total"] = total;
          this.setState(
            {commits: actualCommits}
          );
          this.setState(
            {ready: true}
          );
        })
  			.catch(err => console.error(this.props.url, err.toString()));
}

loadIssues() {
  fetch('https://api.github.com/repos/sonambenakatti/idb/issues')
  			.then(response => response.json())
  			.then(data => {
          let actualIssues = {"sonambenakatti": 0, "AmruthaSreedharane": 0, "jenniferrethi": 0, "GohJazn": 0, "ruchi-shekar": 0, "total": 0};
          let total = 0;
          for (let i = 0; i < data.length; i++) {
            actualIssues[data[i].user.login] += 1;
            total += 1;
          }
          actualIssues["total"] = total;
          this.setState(
            {issues: actualIssues}
          );
        })
  			.catch(err => console.error(this.props.url, err.toString()));
}

render() {
  let commits  = this.state.commits;
  let issues = this.state.issues;

  if(this.state.ready) {
    commits = this.state.commits
  }

  return (
    <div>
      <section className="page-section-1 cta">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <div className="cta-inner text-center rounded">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-lower">ESPRESSO YOSELF</span>
                </h2>
                <p className="mb-0">On vacation, or just need to get away from the bustle of daily life? Our goal is to allow you to grab a warm coffee, find a beautiful view, and have some stunning visuals. With the help of Google Maps, Yelp, and social media we've used the power of location so that you can find a sip and a relaxing spot wherever you are. We know stepping away to take time for yourself can be hard, but with this site we hope you find your happy place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Amrutha */}
      <section className="page-section-1 clearfix">
        <div className="container">
          <div className="intro">
            <img className="intro-img img-fluid mb-3 mb-lg-0 rounded" src="/static/img/amrutha.jpg" alt="Amrutha" />
            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 className="section-heading mb-4">
                <span className="section-heading-lower">Amrutha</span>
                <span className="section-heading-upper">Focus: Backend</span>
              </h2>
              <p className="mb-3">Amrutha's coffee of choice is a soy vanilla latte. In her spare time, she likes playing with her dogs, eating, and planning events. Her software interests include web development, security, and mobile applications.</p>
              <p className="mb-3" id="amrutha">
                <b>Commits:</b> {commits['AmruthaSreedharane']} <br />
                <b>Issues:</b> {issues['AmruthaSreedharane']} <br />
                <b>Unit Tests:</b> 12
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Jaemin */}
      <section className="page-section-1 clearfix">
        <div className="container">
          <div className="intro">
            <img className="intro-img img-fluid mb-3 mb-lg-0 rounded" src="/static/img/jaemin.jpg" alt="Jaemin" />
            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 className="section-heading mb-4">
                <span className="section-heading-lower">Jaemin</span>
                <span className="section-heading-upper">Focus: Backend</span>
              </h2>
              <p className="mb-3">Jaemin is interested in VR, web apps, and mobile apps. In his free time he likes to play guitar and piano, and draw (you can follow him at @godrawjae). His favorite coffee is an americano with sweetener.</p>
              <p className="mb-3" id="jaemin">
                <b>Commits:</b> {commits['GohJazn']} <br />
                <b>Issues:</b> {issues['GohJazn']} <br />
                <b>Unit Tests:</b> 0
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Jenni */}
      <section className="page-section-1 clearfix">
        <div className="container">
          <div className="intro">
            <img className="intro-img img-fluid mb-3 mb-lg-0 rounded" src="/static/img/jenni.jpg" alt="Jenni" />
            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 className="section-heading mb-4">
                <span className="section-heading-lower">Jenni</span>
                <span className="section-heading-upper">Focus: Frontend</span>
              </h2>
              <p className="mb-3">Jenni enjoys reading, trying new food, and watching youtubers. She's into web development and her coffee of choice is cold brew.</p>
              <p className="mb-3" id="jenni">
                <b>Commits:</b> {commits['jenniferrethi']} <br />
                <b>Issues:</b> {issues['jenniferrethi']} <br />
                <b>Unit Tests:</b> 22
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Ruchi */}
      <section className="page-section-1 clearfix">
        <div className="container">
          <div className="intro">
            <img className="intro-img img-fluid mb-3 mb-lg-0 rounded" src="/static/img/ruchi.jpg" alt="Ruchi" />
            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 className="section-heading mb-4">
                <span className="section-heading-lower">Ruchi</span>
                <span className="section-heading-upper">Focus: Frontend</span>
              </h2>
              <p className="mb-3">Ruchi is a fellow coffee enthusiast and guilty Starbucks fanatic. Her go to coffee drink is plain coffee with a little vanilla and a splash of coconut milk. In her spare time she likes to try new foods, do yoga, and binge watch TV shows. She's excited to get out in the real world and start off her career as a software engineer!
              </p>
              <p className="mb-3" id="ruchi">
                <b>Commits:</b> {commits['ruchi-shekar']} <br />
                <b>Issues:</b> {issues['ruchi-shekar']} <br />
                <b>Unit Tests:</b> 16
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Sonam */}
      <section className="page-section-1 clearfix">
        <div className="container">
          <div className="intro">
            <img className="intro-img img-fluid mb-3 mb-lg-0 rounded" src="/static/img/sonam.jpg" alt="Sonam" />
            <div className="intro-text left-0 text-center bg-faded p-5 rounded">
              <h2 className="section-heading mb-4">
                <span className="section-heading-lower">Sonam</span>
                <span className="section-heading-upper">Focus: Frontend</span>
              </h2>
              <p className="mb-3">Sonam likes all types of coffee, although her go-to is an iced coffee with one pump of vanilla syrup. In her free time, she loves to eat and attempt to convince herself that running is fun. She hopes one day she can make an impact as a software engineer.</p>
              <p className="mb-3" id="sonam">
                <b>Commits:</b> {commits['sonambenakatti']} <br />
                <b>Issues:</b> {issues['sonambenakatti']} <br />
                <b>Unit Tests:</b> 11
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section-1 cta" id="info">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <div className="text-center rounded">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-lower">ABOUT</span>
                </h2>
                <h3 className="mb-4">STATISTICS</h3>
                <p className="mb-4">
                  Commits: {commits['total']} <br />
                  Issues: {issues['total']} <br />
                  Unit Tests: 59
                </p>
                <h3 className="mb-4">DATA SOURCES</h3>
                <p className="mb-4">
                  <a href="https://www.yelp.com/developers/documentation/v3"><b>Yelp</b></a><br />
                  We created a python script that gets data via Yelp Fusions api. Yelp Fusion returns JSON objects which we then parse and store in the python script.<br />
                  <a href="https://developers.google.com/places/"><b>Google Places</b></a><br />
                  We used the Google Places API to run a places search, a place details search, and a place photos search.<br />
                  <a href="https://www.flickr.com/services/api/"><b>Flickr</b></a><br />
                  We scraped data from the Flickr API using flickrapi, a third party Python interface to make requests. We used photos search, get info, and get favorites to populate our snapshots model.
                </p>
                <h3 className="mb-4">TOOLS</h3>
                <p className="mb-4">
                  <b>Github:</b> for code storage and collaboration<br />
                  <b>React:</b> for our front-end component based javascript code<br />
                  <b>MySQL:</b> for database queries<br />
                  <b>AWS RDS:</b> as our relational database storage<br />
                  <b>Bootstrap:</b> to beautify our UI<br />
                  <b>Flask:</b> for our backend framework <br />
                  <b>Amazon Web Services:</b> to host our website<br />
                  <b>Postman:</b> to help test our REST API endpoints<br />
                  <b>Namecheap:</b> to obtain a free domain name<br />
                  <b>GitBook:</b> holds our REST API<br />
                  <b>flickrapi:</b> to easily scrape data from the Flickr API<br />
                  <b>Unittests:</b> to test our backend python code<br />
                  <b>Selenium:</b> to test our GUI<br />
                  <b>Mocha:</b> to test our javascript code<br />
                  <b>Reach-Highlight-Words:</b>to highlight words in search results<br/ >
                  <b>Reach-Select:</b>to filter and sort on model pages<br/ >
                  <b>SQL-Alchemy:</b>to use mysql with python<br/ >
                </p>
                <h3 className="mb-4"><a href="https://github.com/sonambenakatti/idb">Github</a></h3>
                <h3 className="mb-4"><a href="https://sonambenakatti.gitbooks.io/espresso-yoself/content/">Gitbook</a></h3>
                <h3 className="mb-4"><a href="https://www.gitbook.com/book/sonambenakatti/api/">API Gitbook</a></h3>
                <h3 className="mb-4"><a href="https://yuml.me/3114f25a.png">UML Diagram</a></h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {'{'}% endblock %{'}'}
    </div>
  );
  }
}

export default About;
