import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        "https://api-2022.uchaguzi.or.ke/api/v3/posts"
      );
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <main className="bg-section min-h-screen">
      <section className="container mx-auto">
        <article>Dashboard</article>
        <article className="flex flex-col gap-5 p-2">
          {posts?.results?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default Posts;
