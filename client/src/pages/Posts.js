import { useContext, useEffect, useState, useCallback } from "react";

import axios from "axios";
import Post from "../components/Post";
import { AppContext } from "../contexts/AppContext";

const Posts = () => {
  const [posts, setPosts] = useState({
    "count": 3,
    "results": [
        {
            "id": 1,
            "url": "https://inuasauti.api.ushahidi.io/api/v3/posts/1",
            "user": {
                "id": 2,
                "url": "https://inuasauti.api.ushahidi.io/api/v3/users/2"
            },
            "parent_id": null,
            "form": {
                "id": 1,
                "url": "https://inuasauti.api.ushahidi.io/api/v3/forms/1"
            },
            "message": null,
            "color": null,
            "type": "report",
            "title": "inua test",
            "slug": "inua-test",
            "content": "this is a test",
            "status": "published",
            "created": "2023-01-16T15:38:02+00:00",
            "updated": null,
            "locale": "en_us",
            "values": {
                "location_default": [
                    {
                        "lon": 36.805026252977,
                        "lat": -1.306504499738
                    }
                ]
            },
            "post_date": "2023-01-16T15:36:59+00:00",
            "tags": [],
            "published_to": [],
            "completed_stages": [],
            "sets": [],
            "lock": null,
            "source": null,
            "contact": null,
            "data_source_message_id": null,
            "allowed_privileges": [
                "read",
                "search"
            ]
        }
    ],
    "limit": null,
    "offset": 0,
    "order": "desc",
    "orderby": "post_date",
    "curr": "https://inuasauti.api.ushahidi.io/api/v3/posts?orderby=post_date&order=desc&offset=0&limitPosts=1",
    "next": "https://inuasauti.api.ushahidi.io/api/v3/posts?orderby=post_date&order=desc&offset=0&limitPosts=1",
    "prev": "https://inuasauti.api.ushahidi.io/api/v3/posts?orderby=post_date&order=desc&offset=0&limitPosts=1",
    "total_count": 3
});
  const [info, setInfo] = useState([]);
  const [title, setTitle] = useState("nakuru");
  const [postDate, setPostDate] = useState("2023-01-16T15:36:59+00:00");
  const [category, setCategory] = useState("land dispute");
  const [source, setSource] = useState("twitter");
  const [message, setMessage] = useState("land grabbing in nakuru");

  const { contract, kit, useAccount, notification, connectWallet } =
    useContext(AppContext);

  //TODO
  const writePost = async () => {
    const params = [category, title, source, postDate, message ];
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
    
    // await console.log(posts.results[0].content);
    // await setMessage(posts.results[0].content);
    if(posts.results.length > 1 ){
      await  setMessage(posts.results[0].content);
      await  setSource(posts.results[0].source);
      await  setTitle(posts.results[0].title);
      await  setPostDate(posts.results[0].post_date);
      console.log("new data found");
      writePost();
    }
    else{
      console.log("no new data");
    }
  }

  // console.log(posts.results.length);
  
  useEffect(()=>{
    
    // console.log(posts?.results?.[0]);
    setPostData();
    // console.log(title);
    // console.log(posts.results[0].content);
    // console.log(posts.results[0].source);
    // console.log(posts.results[0].post_date);
    },[posts])
    


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
