import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';

import Navbar from '../navbar/Navbar';
import Home from "../home/Home";
import CreatePost from "../create_post/CreatePost";
import PostDetails from "../post_details/PostDetails";
import NotFound from "../not_found/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="Content">
          <Switch>
            <Route exact path={'/'} >
              <Home/>
            </Route>

            <Route path={'/create'}>
              <CreatePost />
            </Route>

            <Route path={'/posts/:id'} >
              <PostDetails/>
            </Route>

            <Route path={'*'} >
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
