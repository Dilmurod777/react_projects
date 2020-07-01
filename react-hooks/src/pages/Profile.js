import React, {useContext, useEffect} from 'react';
import {GithubContext} from "../context/github/githubContext";
import Loader from "../components/Loader/Loader";
import {Link} from "react-router-dom";
import UserInfo from "../components/UserInfo/UserInfo";
import Repos from "../components/Repos/Repos";

const Profile = ({match}) => {
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
  const url_name = match.params.name

  useEffect(() => {
    getUser(url_name)
    getRepos(url_name)
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loader/>
  }

  return (
    <React.Fragment>
      <Link to={'/'} className='btn btn-link'>Go to Main Page</Link>
      <UserInfo user={user}/>
      <Repos repos={repos}/>
    </React.Fragment>
  )
};

export default Profile;
