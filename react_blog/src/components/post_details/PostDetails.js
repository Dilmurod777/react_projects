import {useHistory, useParams} from 'react-router-dom';

import './PostDetails.css';

import useFetch from "../../hooks/useFetch";

const PostDetails = () => {
  const {id} = useParams();
  const {data: post, isPending, error} = useFetch(`http://localhost:8000/posts/${id}`)
  const history = useHistory();

  const handleDelete = () => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        history.push('/');
      })
  }

  return (
    <div className="PostDetails">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {post && <article>
        <h2>{post.title}</h2>
        <p>Written by {post.author}</p>
        <div>{post.body}</div>
        <button onClick={handleDelete}>Delete</button>
      </article>}
    </div>
  )
}

export default PostDetails;
