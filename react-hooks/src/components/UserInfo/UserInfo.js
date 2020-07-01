import React from 'react';

const UserInfo = ({user}) => {
  const {
    name, company, avatar_url,
    location, bio, blog,
    login, html_url, followers,
    following, public_repos, public_gists,
  } = user;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3 text-center">
            <div
              style={{borderRadius: '50%', width: '250px', height: '250px', overflow: 'hidden'}}
              className='mb-3'
            >
              <img
                src={avatar_url}
                alt={name}
                style={{width: '100%', height: '100%'}}
              />
            </div>
            <h1>{name}</h1>
            {location && <p>Location: {location}</p>}
          </div>

          <div className="col">
            {
              bio && <React.Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </React.Fragment>
            }

            <a
              href={html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-primary mb-2'
            >
              Open profile
            </a>

            <ul className='list-group mb-2'>
              {login && <li className='list-group-item'>
                <strong>Username:</strong> {login}
              </li>}

              {company && <li className='list-group-item'>
                <strong>Company:</strong> {company}
              </li>}

              {blog && <li className='list-group-item'>
                <strong>Website:</strong> {blog}
              </li>}
            </ul>

            <div className="badge badge-primary mr-1">Followers: {followers}</div>
            <div className="badge badge-success mr-1">Following: {following}</div>
            <div className="badge badge-info mr-1">Repositories: {public_repos}</div>
            <div className="badge badge-dark mr-1">Gists: {public_gists}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
