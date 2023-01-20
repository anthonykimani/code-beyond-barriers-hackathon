import { useContext, useEffect, useState, useCallback } from "react";

import axios from "axios";
import Post from "../components/Post";
import { AppContext } from "../contexts/AppContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState([]);
  const [title, setTitle] = useState(null);
  const [postDate, setPostDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [source, setSource] = useState(null);
  const [message, setMessage] = useState(null);

  const { contract, kit, useAccount, notification, connectWallet } =
    useContext(AppContext);

  //TODO
  const writePost = async () => {
    const params = [category, title, source, postDate, message, category];
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
  
  // const loadPosts = ()=>{
    
    // }
    
    useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        "https://inuasauti.api.ushahidi.io/api/v3/posts"
      );
      setPosts(data);
    };
    fetchPosts();
    // loadPosts();
    connectWallet();
    getInformationToApprove();
  }, []);
  
  const setPostData = async()=>{
    await console.log(posts.results[0].content);
    // await setMessage(posts.results[0].content);
    await  setMessage(posts.results[0].content);
    await  setSource(posts.results[0].source);
    await  setTitle(posts.results[0].title);
    await  setPostDate(posts.results[0].post_date);
  }
  
  useEffect(()=>{
    
    console.log(posts?.results?.[0]);
    setPostData();
    console.log(posts.results[0].title);
    console.log(posts.results[0].content);
    console.log(posts.results[0].source);
    console.log(posts.results[0].post_date);
    },[posts])
    
    // writePost();


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
