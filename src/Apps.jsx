import React, { useEffect, useState } from "react";

function Apps() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        console.log("DD", data);
        if (res.ok) {
          setPosts(data);
        }
      } catch (err) {
        console.log("Error While fetching Posts", err);
      }
    }

    fetchPosts();
  }, []);
  console.log("Post Datas", posts);
  return (
    <div>
      <h1>Api Data</h1>
      {posts?.map((post) => {
        return (
          <>
            <p className="bg-amber-500">{post?.id}</p>
            <br />
          </>
        );
      })}
    </div>
  );
}

export default Apps;
