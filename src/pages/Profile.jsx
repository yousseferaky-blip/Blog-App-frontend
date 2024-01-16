import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import ProfilePosts from '../component/ProfilePosts'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { BASE_URL } from '../assets/url'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Loader from '../component/Loader'

const Profile = () => {
  const {user, setUser } = useContext(UserContext)
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const FetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${user._id}`,{ withCredentials: true })
      setUserName(res.data.info.username)
      setEmail(res.data.info.email)
    } catch (err) {
      console.log(err)
    }
  }

  const UpdateUser = async () => {
    try {
      await axios.put(`${BASE_URL}/users/${user._id}`,
        { username, email },
        { withCredentials: true }
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'سيتم حذف المستخدم بشكل دائم',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'حذف المستخدم',
        cancelButtonText: 'إلغاء',
      });

      if (result.isConfirmed) {
        const res = await axios.delete(`${BASE_URL}/users/${user._id}`, { withCredentials: true, timeout: 5000 });
        setUser(null);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchUser();
  }, [])


  return (
    <>
    {
      user ?     <>
      <div className='px-2 md:px-[100px] space-x-2 py-4'>
        <Navbar />
        <div className=' flex md:flex-row flex-col-reverse'>
          <div className='flex flex-col md:w-[70%] w-full '>
            <h1 className='text-xl font-bold mb-4'>Your Posts</h1>
              <ProfilePosts  />
          </div>
          <div className='flex flex-col space-y-4 md:w-[30%] w-full border-l-0 md:border-l-2 md:border-b-0 border-b-2 px-2 py-2 border-gray-300'>
            <h1 className='text-xl font-bold mb-4'>Profile</h1>
            <label htmlFor="username" className='text-gray-600 mb-2'>Your UserName</label>
            <input onChange={(e) => setUserName(e.target.value)} value={username} className='outline-none px-4 py-2 text-gray-500 rounded-lg border-2 border-black' placeholder='Your UserName' type='text' />
            <label htmlFor="email" className='text-gray-600 mb-2'>Your Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='outline-none px-4 py-2 text-gray-500 rounded-lg border-2 border-black' placeholder='Your Email' type='email' />
            <div className='flex items-center space-x-4 mt-8'>
              <button onClick={UpdateUser} className='text-white bg-black rounded-md font-semibold px-4 py-2 hover:text-black hover:bg-gray-400'>Update</button>
              <button onClick={handleDelete} className='text-white bg-black rounded-md font-semibold px-4 py-2 hover:text-black hover:bg-gray-400'>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>: <Loader />
    }

    </>
  )
}

export default Profile;
