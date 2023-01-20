import { useContext, useEffect, useState,useCallback } from "react";
import axios from "axios";
import Post from "../components/Post";

import { AppContext } from "../contexts/AppContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [info,setInfo] = useState([]);
  const {contract,kit,useAccount,notification,connectWallet} = useContext(AppContext);
  let message ="ronaldo in doha";
  let id= 1;
  let category = "sports";
  //TODO
  const writePost = async()=>{
    const params=[
      message,
      id,
      category

    ]
    try{
      await  contract.methods.getMessagefromUshahidiApi(...params).send({from : kit.defaultAccount});
     notification("was post successful");
     alert(useAccount);
    }catch(error){
      notification("the error is",error);
      notification("userAccount is",useAccount)
    }
    
    
  }
  //Todo get all information
  const getInformationToApprove =  useCallback(  async ()=>{
    try{
     
      let allinfo=[]
      
        const infor = await contract.methods.getAllInformation().call({from : kit.defaultAccount})
       
       infor.forEach((element) => {
        allinfo.push(element)
        
       });
       setInfo(allinfo);
       

     
     
    }catch(error){
      console.log(error)
    }
  },[contract])
  console.log("ron")

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        "https://api-2022.uchaguzi.or.ke/api/v3/posts"
      );
      setPosts(data);
    };
    fetchPosts();
    getInformationToApprove();
    connectWallet();
  }, []);
  
console.log(info);
  return (
    <main className="bg-section min-h-screen">
      <section className="container mx-auto">
        <article>Dashboard <button onClick={()=>writePost()}>Post DAta</button></article>

        <article className="flex flex-col gap-5 p-2">
          
          {
          
          posts?.results?.map((post) => (
            
            <Post key={post.id} post={post} />
            

          ))}
        </article>
      </section>
    </main>
  );
};

export default Posts;
