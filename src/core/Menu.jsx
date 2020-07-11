/* eslint-disable no-use-before-define */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import InfiniteSelect from "../components/InfiniteSelect/InfiniteSelect";
import "../css/menu.css";

const isActive = (history, path) => {
    if(history.location.pathname === path) return "active";
    return "";
};

const Menu = ({ history }) => (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Forecast-App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className={'nav-item ' + isActive( history, '/' )}>
                    <Link className={'nav-link ' + isActive( history, '/' )} to="/">Home</Link>
                </li>
            </ul>
            <InfiniteSelect/>
        </div>
    </nav>
);

export default withRouter(Menu);