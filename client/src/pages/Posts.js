import { useContext, useEffect, useState, useCallback } from "react";

import axios from "axios";
import Post from "../components/Post";
import { AppContext } from "../contexts/AppContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [info, setInfo] = useState([]);

  const { contract, kit, useAccount, notification, connectWallet } =
    useContext(AppContext);
  let imageUrl =
    "https://www.shutterstock.com/image-photo/bitcoin-crypto-currency-mining-concept-1400514362";
  let message = "ronaldo in doha";
  let source = "twitter";
  let title = "The goat Debate";

  let postDate = "11/2/2023";
  //TODO
  const writePost = async () => {
    const params = [imageUrl, title, source, postDate, message];
    try {
      await contract.methods
        .getMessagefromUshahidiApi(...params)
        .send({ from: kit.defaultAccount });
      notification("was post successful");
      alert(useAccount);
    } catch (error) {
      notification("the error is", error);
      console.log("post error", error);
      notification("userAccount is", useAccount);
    }
  };
  //Todo get all information
  const getInformationToApprove = useCallback(async () => {
    try {
      let allinfo = [];

      const infor = await contract?.methods
        .getAllInformation()
        .call({ from: kit.defaultAccount });

      infor?.forEach((element) => {
        allinfo.push(element);
      });
      setInfo(allinfo);
    } catch (error) {
      console.log(error);
    }
  }, [contract]);

  console.log(info);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        "https://api-2022.uchaguzi.or.ke/api/v3/posts"
      );
      setPosts(data);
    };
    fetchPosts();
    connectWallet();
    getInformationToApprove();
  }, []);

  return (
    <main className="bg-section min-h-screen pb-10">
      <section className="bg-button text-white md:h-[20vh]">
        <article className="container mx-auto h-full flex flex-col gap-5 p-2 md:flex-row">
          <div className="w-full md:w-8/12 flex justify-center flex-col">
            <h1 className="font-bold text-2xl md:text-4xl md:w-[80%] py-2">
              Reports
            </h1>
            <p className="py-2 md:w-[80%]">
              Get access to accurate, factual reports from the people at the
              ground using a decentralised autonomous organisation that
              encourages the community to contribute through various
              initiatives.
            </p>
          </div>
          <div className="w-4/12 flex items-center justify-center">
            <button
              className="flex  items-center bg-red-400 text-white rounded-3xl font-bold  py-2 px-4 w-fit"
              onClick={() => writePost()}
            >
              Post Data
            </button>
          </div>
        </article>
      </section>
      <section className="container py-5 mx-auto">
        <article className="flex flex-col gap-5 p-2">
          {info?.map((post) => (
            <Post key={post._messageId} post={post} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default Posts;
