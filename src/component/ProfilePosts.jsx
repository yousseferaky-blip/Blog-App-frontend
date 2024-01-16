import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../assets/url';
import { UserContext } from '../context/UserContext';
import Loader from './Loader';

const ProfilePosts = () => {
  const { user } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/post/user/${user._id}`,{ withCredentials: true });
        setUserPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserPosts();
  }, []);

  return (
    <div>
      {loading && <p><Loader /></p>}
      {!loading && userPosts.length === 0 && <p>No posts available.</p>}
      {!loading &&
        userPosts.map((p) => (
          <div key={p._id} className="w-full flex md:flex-row mt-8 space-x-3 flex-col">
            {/* LEFT */}
            <div className="md:w-[35%] h-[200px] flex justify-center items-center mb-4">
              <img
                className="w-[50%] md:w-full md:h-full object-cover"
                src={`${BASE_URL}/images/${p.photo}`}
                alt={`Post ${p._id}`}
              />
            </div>
            {/* RIGHT */}
            <div className="flex flex-col  md:w-[65%] w-[90%]">
              <h1 className="text-xl font-medium md:mr-2 mb-1 md:text-2xl">{p.title}</h1>
              <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between space-x-4 md:mb-4">
                <p>@{p.username}</p>
                <div className="flex space-x-2">
                  <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
                  <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
                </div>
              </div>
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">{p.desc}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfilePosts;
