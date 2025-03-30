import { useState, useEffect } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const Demo = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`);
        const posts = await response.json();
        setPosts(posts)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong, please try again.</div>
  }

  return (
    <div>
      <h1>Data Fetching in React</h1>
      <button onClick={() => setPage(page + 1)}>Increase Page ({page})</button>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Demo;
