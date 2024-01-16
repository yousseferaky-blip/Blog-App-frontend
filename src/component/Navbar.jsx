import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../assets/url";
import Swal from 'sweetalert';

const Navbar = () => {
  const {user,setUser} = useContext(UserContext);
  const [menu,setMenu] = useState(false)
  const navigate = useNavigate()
  
  const handleLogOut = () => {
    Swal({
      title: 'هل أنت متأكد؟',
      text: 'سيتم تسجيل الخروج بشكل دائم',
      icon: 'warning',
      buttons: ['إلغاء', 'تسجيل الخروج'],
      dangerMode: true,
    })
    .then((willLogout) => {
      if (willLogout) {
        try {
          axios.get(`${BASE_URL}/auth/logout`,{withCredentials:true});
          setUser(null);
          navigate("/login");
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <nav className="flex justify-between items-center  py-4">
      <h1 className="text-xl  md:text-2xl md:font-medium decoration-none">
        <Link to={"/"}>Blog Market</Link>
        </h1>

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? <h3><Link to={"/create"}>Create</Link></h3> : <h3><Link to={"/login"}>Login</Link></h3> }
        {user ? <h3><Link to={`/profile/${user._id}`}>Profile</Link></h3> : <h3><Link to={"/register"}>Register</Link></h3> }
        {user && <h3 onClick={handleLogOut}  className="cursor-pointer">Logout</h3> }
      </div>
      <div onClick={()=>setMenu(!menu)} className="md:hidden  ">
        <p className="cursor-pointer text-2xl"><FaBars /></p>
        {menu && <>
      <div className="bg-black w-11/12 mx-auto flex flex-col gap-2 items-start absolute top-14 left-1/2 transform -translate-x-1/2 p-4 rounded-md">
        {!user && <h3 className="text-white text-lg hover:text-gray-500"><Link to={"/login"}>Login</Link></h3>} (
        {!user && <h3 className="text-white text-lg hover:text-gray-500"><Link to={"/register"}>register</Link></h3>} (
        {user && <h3 className="text-white text-lg hover:text-gray-500"><Link to={`/profile/${user._id}`}>Profile</Link></h3>} (
        {user && <h3 className="text-white text-lg hover:text-gray-500"><Link to={"/create"}>Create</Link></h3>} (
        {user && <h3 onClick={handleLogOut} className="text-white text-lg hover:text-gray-500"><Link to={"/"}>Logout</Link></h3>} (
      </div>
        </>}
      </div>
    </nav>
  );
};

export default Navbar;
