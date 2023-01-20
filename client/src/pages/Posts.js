import { useContext, useEffect, useState, useCallback } from "react";

import axios from "axios";
import Post from "../components/Post";
import { AppContext } from "../contexts/AppContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [info, setInfo] = useState([]);

  const { contract, kit, useAccount, notification, connectWallet } =
    useContext(AppContext);
    let imageUrl = "https://www.shutterstock.com/image-photo/bitcoin-crypto-currency-mining-concept-1400514362";
  let message = "ronaldo in doha";
  let source = "twitter";
  let title = "The goat Debate";
  
  let postDate = "11/2/2023";
  //TODO
  const writePost = async () => {
    const params = [imageUrl,title, source, postDate, message];
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
    <main className="bg-section min-h-screen py-10">
      <section className="container mx-auto">
        <article>
          Dashboard <button onClick={() => writePost()}>Post DAta</button>
        </article>

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
