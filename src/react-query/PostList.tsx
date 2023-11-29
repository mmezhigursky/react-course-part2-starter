import { useState } from "react";
import usePosts from "./hooks/UsePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1); // [1, 2, 3, 4, 5
  const [userId, setUserId] = useState(1); // [1
  const { data: posts, error, isLoading } = usePosts({ page, pageSize });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        className="btn btn-primary my-3"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary my-3 ms-1"
        onClick={() => setPage(page + 1)}
      >
        next
      </button>
    </>
  );
};

export default PostList;
