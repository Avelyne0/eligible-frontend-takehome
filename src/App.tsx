import React from "react";
import { Redirect, Route, Switch } from "react-router";
import PostDetail from "./components/PostDetail";
import Posts from "./components/Posts";

export default () => (
  <div>
    <Switch>
      <Route exact path="/" component={Posts} />
      <Route exact path="/posts/:id" component={PostDetail} />
      <Redirect to="/" />
    </Switch>
  </div>
);
