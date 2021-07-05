import {useState} from "react";
import {useHistory} from 'react-router-dom';

import './CreatePost.css'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('none');
  const [isPending, setIsPending] = useState(false);
  const [missingInputs, setMissingInputs] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newMissingInputs = [];
    if(title.trim() === ''){
      newMissingInputs.push('title');
    }
    if(body.trim() === ''){
      newMissingInputs.push('body');
    }
    if(author === 'none'){
      newMissingInputs.push('author');
    }

    if(newMissingInputs.length === 0){
      const post = {title, body, author};

      setIsPending(true);
      fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post),
      })
        .then(res => {
          setIsPending(false);
          history.push('/');
        });
    }else{
      setMissingInputs(newMissingInputs);
    }
  }

  return (
    <div className="CreatePost">
      <h2>Add a new Post</h2>

      <form onSubmit={handleSubmit}>
        <label
          className={missingInputs.includes('title') ? 'MissingInput' :'CorrectInput'}
        >Post title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label
          className={missingInputs.includes('body') ? 'MissingInput' :'CorrectInput'}
        >Post body:</label>
        <textarea
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <label
          className={missingInputs.includes('author') ? 'MissingInput' :'CorrectInput'}
        >Post author:</label>
        <select
          value={author}
          onChange={e => setAuthor(e.target.value)}
        >
          <option value="none">Select Author</option>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>

        {!isPending && <button>Add post</button>}
        {isPending && <button>Adding post</button>}
      </form>
    </div>
  )
}

export default CreatePost
