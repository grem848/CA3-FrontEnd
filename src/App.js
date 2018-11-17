import React, { Component } from "react";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn"
// import CRUDTable from "./components/CRUD Table/CRUDTable"
import facade from "./facades/ApiFacade";

import ShowTable from "./components/SwapiTables/ShowSimpleSwapiTable"
import SwapiTable from "./components/SwapiTables/SwapiTable"
import SwapiPag from "./components/SwapiTables/SwapiPag"

const topics = [{ id: "topic-1", topic: <SwapiPag /> },
{ id: "topic-2", topic: <SwapiTable/> },
{ id: "topic-3", topic: "Yet another Topic" },
{ id: "topic-4", topic: <ShowTable /> }];


class BasicExample extends Component {

    constructor() {
        super()
        this.state = {
            hasLoggedIn: false
        }
    }

    Home = () => {
        return (
            <div>
                <LogIn totalLogOut={this.totalLogOut} facade={facade} />
            </div>
        );
    }

    totalLogOut = () => {
        facade.logout()
        this.setState({ hasLoggedIn: false });
    }

    render() {
        return (
            <Router>
                <div>
                    <ul className="header">
                        <li>
                            <NavLink exact to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/topics">Topics</NavLink>
                        </li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={this.Home} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} />
                </div>
            </Router>
        );
    }
}

function About() {
    if (facade.loggedIn() === true) {
        return (
            <div>
                <h2>About</h2>
                <br/>
                <h4>Quick Start Project for group #IkkeForLangt</h4>
                {/* <CRUDTable /> */}

            </div>
        );
    }
    else { return <div>LogIn first</div> }
}

function Topics({ match }) {
    const lis = topics.map(t => <li key={t.id}> <Link to={`${match.url}/${t.id}`}>{t.id}</Link> </li>);

    if (facade.loggedIn() === true) {
        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    {lis}
                </ul>


                <Route path={`${match.path}/:topicId`}
                    render={(props) =>
                        <Topic {...props} detail={topics.find(t => t.id === props.match.params.topicId)} />} />


                <Route
                    exact
                    path={match.path}
                    render={() => <h3>Please select a topic.</h3>}
                />
            </div>
        );
    }
    else { return <div>LogIn first</div> }
}

function Topic({ match, detail }) {
    return (
        <div>
            <h3>{match.params.topicId}</h3>
            <div>{detail.topic}</div>
        </div>
    );
}

export default BasicExample;
