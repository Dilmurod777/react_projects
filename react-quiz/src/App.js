import React, {Component} from 'react';
import {connect} from "react-redux";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import {autoLogin} from "./store/actions/auth";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Logout from "./components/Logout/Logout";

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' component={QuizList} exact/>
        <Redirect to='/'/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' component={QuizList} exact/>
          <Redirect to='/'/>
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
