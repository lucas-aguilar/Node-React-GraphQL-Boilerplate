import React from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import { useHelloQuery } from './generated/graphql';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Bye } from './pages/Bye';
import { Header } from './Header';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          {/* <Route exact path="/" render={() => <div>yo.</div>} /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bye" component={Bye} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
