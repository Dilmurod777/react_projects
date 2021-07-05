import './Home.css';

import PostsList from "./components/posts_list/PostsList";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const {data:posts, isPending, error} = useFetch('http://localhost:8000/posts');

  return (
    <div className="Home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {posts && <PostsList posts={posts}
                           title={`All Posts`}/>}
    </div>
  )
}

export default Home;
