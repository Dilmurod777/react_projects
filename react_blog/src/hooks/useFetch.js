import {useEffect, useState} from "react";

import PostModel from "../models/post_model/PostModel";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, {signal: abortController.signal})
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error('Could not fetch the data for that resource.')
        }
      })
      .then(data => {
        let fetchedData;
        if(Array.isArray(data)){
          fetchedData = [];
          for (let postJson of data) {
            fetchedData.push(PostModel.fromJson(postJson))
          }
        }else{
          fetchedData = PostModel.fromJson(data);
        }
        setError(null);
        setIsPending(false);
        setData(fetchedData);
      })
      .catch(err => {
        if(err.name !== 'AbortError'){
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  }, [url]);

  return {data, isPending, error};
}

export default useFetch;
