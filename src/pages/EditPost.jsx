import { useEffect, useState,useContext  } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { ImCross } from "react-icons/im";
import { BASE_URL } from "../assets/url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const EditPost = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const {user} = useContext(UserContext)
  const [post, setPost] = useState({
    title: "",
    desc: "",
    username: "",
    userId: "",
  });
 
  const FetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/post/${id}`,{ withCredentials: true });
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    FetchPost()
  },[])
   
  const handleInputChange = (e) => {setPost({...post,[e.target.name]: e.target.value, });};

  const UpdatePost = async (e)=>{
    try{
        e.preventDefault()
        const res = await axios.put(`${BASE_URL}/post/${id}`,
        {
            title: post.title,
            username: post.username,
            desc: post.desc,
            userId: user._id, 
          },
        {withCredentials:true})
        navigate("/")
    }catch(err){
        console.log(err)
    }
  }
  return (
    <>
      <div className="px-2 md:px-[100px] py-4">
      <Navbar />
        <h1 className="font-bold md:text-2xl text-xl mt-8 mb-4">
          Update a Post
        </h1>
        <form className="w-full flex flex-col space-y-4  ">
          <input
            className="w-full px-4 py-2 rounded-lg border-2 border-black outline-none"
            type="text"
            placeholder="Enter a Post Title"
            onChange={handleInputChange}
            value={post.title}
            name={"title"}
          />
          <input
            className="w-full px-4 py-2 rounded-lg border-2 border-black outline-none"
            type="text"
            placeholder="Enter a Post UserName"
            onChange={handleInputChange}
            value={post.username}
            name={"username"}
          />
          

          <textarea
            className="px-4 py-2 outline-none border-2 border-black rounded-md resize-none"
            placeholder="Enter Post Description"
            rows={10}
            cols="15"
            onChange={handleInputChange}
            value={post.desc}
            name={"desc"}
          ></textarea>
          <button onClick={UpdatePost} className="w-full bg-black text-white font-semibold px-4 py-2 md:text-2xl text-xl hover:bg-gray-400 hover:text-black rounded-md duration-500">
            Update
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
