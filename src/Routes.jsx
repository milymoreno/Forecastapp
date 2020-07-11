import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Detail from "./core/Detail";
import "./css/main.css"

const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/detail/:id" exact component={Detail} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;