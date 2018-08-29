import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login, MakeStamp } from 'pages';
import AppTemplate from 'components/common/AppTemplate';
import { Base, HeaderContainer } from 'containers';

class App extends Component {
  render() {
    return (
      <AppTemplate header={<HeaderContainer />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/makestamp" component={MakeStamp} />
          <Route path="/login" component={Login} />
        </Switch>
        <Base />
      </AppTemplate>
    );
  }
}

export default App;
