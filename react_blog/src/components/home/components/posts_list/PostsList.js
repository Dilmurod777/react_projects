import {Link} from "react-router-dom";

import './PostsList.css'

const PostsList = ({posts, title, handleDelete}) => {
  return (
    <div className="PostsLists">
      <h2>{title}</h2>

      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <div className="PostPreview">
            <h2>{post.title}</h2>
            <p>Written by {post.author}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostsList;
