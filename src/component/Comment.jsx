import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { BASE_URL } from "../assets/url";
import axios from "axios";
import Swal from "sweetalert2";

const Comment = ({ c }) => {
  const { user } = useContext(UserContext);

  const DeleteComment = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'لن يمكنك التراجع عن هذا الإجراء!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذفه!',
        cancelButtonText: 'لا، ألغِ العملية'
      });
  
      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/comment/${id}`, { withCredentials: true });
        window.location.reload(true)
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="py-2 px-2 bg-gray-200 rounded-lg mt-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600 ">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-2">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {c.userId == user._id && (
            <div className="flex justify-center items-center space-x-2">
              <p onClick={()=>DeleteComment(c._id)} className="cursor-pointer hover:text-red-500">
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2 ">{c.comment}</p>
    </div>
  );
};

export default Comment;
