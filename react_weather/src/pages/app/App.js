import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import {Switch} from 'react-router'

import './App.scss';
import Home from "../home/Home";
import PopularCities from "../popular_cities/PopularCities";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="LeftSection"/>
        <div className="RightSection">
          <Header/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>

            <Route path="/popular">
              <PopularCities/>
            </Route>
          </Switch>
          <Footer/>
        </div>

        <div className="RightVerticalLine"/>
        <div className="BottomHorizontalLine"/>
      </div>
    </Router>
  );
}

export default App;
