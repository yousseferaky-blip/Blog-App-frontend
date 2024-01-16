import React, { useContext, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../component/Comment";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../assets/url";
import Swal from "sweetalert";
import Loader from "../component/Loader";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const PostDetails = () => {
  const id = useParams().id;
  const { user , getUser } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // =========================== GET POST ===========================
  const FetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/post/${id}`);
      setPost(res.data.post);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false); 
    }
  };

  useEffect(() => {
    FetchPost();
    getUser();
  }, [id]);
  // =========================== DELETE POST ===========================
  const DeletePost = async () => {
    const willLogout = await Swal({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف البوست بشكل دائم",
      icon: "warning",
      buttons: ["إلغاء", "حذف البوست"],
      dangerMode: true,
    });

    if (willLogout) {
      try {
        await axios.delete(`${BASE_URL}/post/${id}`, { withCredentials: true });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  // =========================== GET COMMENT ===========================
  const GetComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comment/post/${id}`);
      setComments(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetComments();
  }, [id]);
  // =========================== CREATE COMMENT ===========================
  const CreateComment = async (e) => {
    try {
      e.preventDefault();
      if (!comment.trim()) {
        toast.error("لا يمكن ان يكون فارغ");
        return;
      }
      await axios.post(
        `${BASE_URL}/comment/create`,
        { comment, author: user.username, postId: id, userId: user._id },
        { withCredentials: true }
      );

      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="px-2 md:px-[100px] py-4 ">
        <Navbar />
        {loading ? (
          <div><Loader /></div>
        ) : (
          
          <div>
            <div className="flex justify-between items-center mt-2 border-gray-300 border-t-2">
              <h1 className="text-xl font-bold text-black md:text-2xl">
                {post.title}
              </h1>

              {user?._id === post?.userId && (
                <div className="flex justify-center items-center space-x-2">
                  <p className="cursor-pointer">
                    <Link to={`/edit/${post._id}`}>
                      <BiEdit />
                    </Link>
                  </p>
                  <p
                    onClick={DeletePost}
                    className="cursor-pointer hover:text-red-600"
                  >
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 md:mt-4">
              <p>@{post.username}</p>
              <div className="flex space-x-2">
                <p>{new Date(post.createdAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.createdAt).toString().slice(16, 24)}</p>
              </div>
            </div>
            <img
              className="w-1/3 md:w-[350px] mx-auto mt-8 object-cover"
              src={`${BASE_URL}/images/${post.photo}`}
            />
            <p className="mx-auto mt-8 text-sm tracking-wider">{post.desc}</p>
            <div className="flex flex-col mt-4">
              <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
              {comments.length > 0 &&
                comments.map((c) => <Comment key={c._id} c={c} />)}
            </div>
            {/* Write a Comment */}
            <div className="flex flex-col mt-4 md:flex-row gap-2">
              <input
                className="md:w-[80%] outline-none px-4 py-2 md:mt-0 border-2 border-slate-500 rounded-sm"
                type="text"
                placeholder="Write a Comment"
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={CreateComment}
                className="bg-black text-white text-sm px-2 font-bold  md:w-[20%] mt-4 md:mt-0 rounded-sm"
              >
                Add Comment
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PostDetails;
