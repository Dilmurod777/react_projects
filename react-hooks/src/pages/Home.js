import React, {useContext} from 'react';
import Search from "../components/Search/Search";
import Card from "../components/Card/Card";
import {GithubContext} from "../context/github/githubContext";
import Loader from "../components/Loader/Loader";

const Home = (props) => {
  const {loading, users} = useContext(GithubContext)

  return (
    <React.Fragment>
      <Search/>

      <div className="row">
        {
          loading
            ? <Loader/>
            : users.map(user => (
              <div className="col-sm-4 mb-4" key={user.id}>
                <Card user={user}/>
              </div>)
            )
        }
      </div>
    </React.Fragment>
  )
};

export default Home;
