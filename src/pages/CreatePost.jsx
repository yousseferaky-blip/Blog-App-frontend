import { useContext, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { BASE_URL } from "../assets/url";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [username, setUserName] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const CreatePost =async (e)=>{
    e.preventDefault()
    const post = {
        title,
        desc,
        username,
        userId: user._id,
      };
    
      const data = new FormData();
      data.append("photo", file);
      Object.keys(post).forEach((key) => {
        data.append(key, post[key]);
      });
      
      try {
        const res = await axios.post(`${BASE_URL}/post/create`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
}

  return (
    <>
    {
      user ?    <div>
      <div className="px-2 md:px-[100px] py-4">
        <Navbar />
        <h1 className="font-bold md:text-2xl text-xl mt-8 mb-4">
          Create a Post
        </h1>
        <form className="w-full flex flex-col space-y-4  ">
          <input
            className="w-full px-4 py-2 rounded-lg border-2 border-black outline-none"
            type="text"
            placeholder="Enter a Post Title"
            onChange={(e)=>setTitle(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-lg border-2 border-black outline-none"
            type="text"
            placeholder="Enter a Post UserName"
            onChange={(e)=>setUserName(e.target.value)}
          />
          <input
            className=""
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
          />
         
          <textarea
            className="px-4 py-2 outline-none border-2 border-black rounded-md resize-none"
            placeholder="Enter Post Description"
            rows={10}
            cols="15"
            onChange={(e)=>setDesc(e.target.value)}
          ></textarea>
          <button
            onClick={CreatePost}
            className="w-full bg-black text-white font-semibold px-4 py-2 md:text-2xl text-xl hover:bg-gray-400 hover:text-black rounded-md duration-500"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>  : <Loader />
    }
</>
  );
};

export default CreatePost;
