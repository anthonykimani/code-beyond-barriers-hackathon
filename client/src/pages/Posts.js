import { useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

const Posts = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        "https://ushahididocs.api.ushahidi.io/api/v3/posts"
      );
      console.log(data);
    };
    fetchPosts();
  }, []);
  return (
    <main className="bg-section min-h-screen">
      <section className="container mx-auto">
        <article>Dashboard</article>
        <article className="flex flex-col gap-5 p-2">
          <Post />
          <Post />
          <Post />
          <Post />
        </article>
      </section>
    </main>
  );
};

export default Posts;
