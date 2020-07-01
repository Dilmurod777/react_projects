import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Alert from "./components/Alert/Alert";
import {AlertState} from "./context/alert/alertState";
import {GithubState} from "./context/github/githubState";

function App() {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Navbar/>

          <div className='container pt-4'>
            <Alert alert={{text: 'Alert testing'}}/>
            <Switch>
              <Route path='/about' component={About}/>
              <Route path='/profile/:name' component={Profile}/>
              <Route path='/' component={Home} exact/>
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;
