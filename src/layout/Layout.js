import React, { useEffect } from "react";
import "./layout.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";

import Home from "../container/home";
import LeaderBoard from "../container/leaderBoard";

import Sidebar from "../container/sidebar";
import MyTeam from "../container/myTeam";
import MyTeamSubmissions from "../container/myTeamSubmissions";

export default function Layout() {
  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-bg"></div>
      <div className="main-body">
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/leader-board" component={LeaderBoard} />
          <Route exact path={`/my-team/:id`} component={MyTeam} />
          <Route exact path={`/my-teams`} component={MyTeamSubmissions} />
        </Switch>
      </div>
    </div>
  );
}
