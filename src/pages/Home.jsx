import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import postService from "../appwrite/config";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts == 0) {
    return (
      <Container>
        <div className="w-full h-screen flex justify-center items-center">
          <div className="bg-gray-400 px-6 py-3 rounded-xl text-white">
            <h2>No posts available add post</h2>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-center items-center w-full min-h-screen ">
        <div className="flex flex-col w-3/4">
           {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
              <br />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
