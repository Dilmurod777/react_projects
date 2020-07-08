import React, {Component} from 'react';
import {connect} from "react-redux";
import {Switch, Route} from 'react-router-dom'

import Auth from "./containers/Auth/Auth";
import Console from "./containers/Console/Console";
import {isAuthExpired} from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.isAuthExpired()
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path={'/console'}
            component={() => <Console/>}
          />
          <Route
            path={'/'}
            exact
            component={() => <Auth/>}
          />
          }
        </Switch>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isAuthExpired: () => dispatch(isAuthExpired())
  }
}

export default connect(null, mapDispatchToProps)(App);
