import React from "react";
import { Redirect, Route, Switch } from "react-router";
import PostDetail from "./components/PostDetail";
import Posts from "./components/Posts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default () => (
  <Container>
    <Switch>
      <Route exact path="/" component={Posts} />
      <Route exact path="/posts/:id" component={PostDetail} />
      <Redirect to="/" />
    </Switch>
  </Container>
);
