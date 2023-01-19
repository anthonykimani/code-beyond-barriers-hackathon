import { Link } from "react-router-dom";
import moment from "moment/moment";

import NoImage from "../assets/images/noImage.png";

const Post = ({ post }) => {
  return (
    <main className="shadow-xl h-[25h] rounded-md bg-white">
      <section className="flex items-center justify-between p-2">
        <article className="w-8/12 flex justify-between">
          <div>
            <span className="text-sm font-medium">{post.status}</span>
          </div>
          <div>
            <span className="text-sm font-medium">
              {moment(post.created).fromNow()}
            </span>
          </div>
          <div className="font-bold text-gray-600 text-sm">
            via {post.source}
          </div>
        </article>
        <article className="w-4/12 flex justify-end">
          <Link to={`/posts/${post.id}`}>
            <span className="px-3 py-1 w-fit bg-button rounded-md text-green-100 font-medium">
              View
            </span>
          </Link>
        </article>
      </section>
      <section className="flex flex-col md:flex-row p-2">
        <article className="w-full md:w-4/12 flex  items-center justify-center">
          <img
            className="w-full md:w-20 object-cover "
            src={NoImage}
            alt="data"
          />
        </article>
        <article className="w-full md:w-8/12">
          <h1 className="text-2xl font-medium py-2 md:pb-2">{post.title}</h1>
          <p className=" text-gray-700 font-medium text-sm">{post.content}</p>
        </article>
      </section>
    </main>
  );
};

export default Post;
