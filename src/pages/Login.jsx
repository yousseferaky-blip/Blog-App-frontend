import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../assets/url"
import { toast } from "react-toastify"
import { UserContext } from "../context/UserContext"
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      navigate("/");
      toast.success("Logged Successfully");
      setUser(res.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.error("Incorrect Password Or Email");
        } else if (err.response.status === 404) {
          toast.error("Email and Password are required");
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("An unexpected error occurred");
        console.log(err);
      }
    }
  };

  return (
    <>
     <nav className="flex justify-between items-center px-2 md:px-[100px] py-4">
      <h1 className="text-xl  md:text-2xl md:font-medium decoration-none">
        <Link to={"/"}>Blog Market</Link>
      </h1>
      <h3><Link to={"/login"}>Login</Link></h3>
      </nav>
    <div className='w-full flex justify-center items-center h-[70vh] '>
        <div className='flex flex-col justify-center items-center space-y-4 w-[80%] rounded-lg md:w-[50%] py-8 px-6 border-2 border-slate-500'>
            <h1 className='text-xl font-bold '>Login in to your account</h1>
            <input onChange={(e)=>setEmail(e.target.value)} className='w-full px-4 py-2 rounded-lg border-2 border-black outline-none' placeholder='Enter Your Email' type='email'/>
            <div className='w-full relative '>
              <div onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                {showPassword ? (
                  <FaEye  />
                  ) : (
                  <FaEyeSlash  />
                )}
              </div>
            <input onChange={(e)=>setPassword(e.target.value)} className='w-full px-4 py-2 rounded-lg border-2 border-black outline-none' placeholder='Enter Your Password' type={showPassword ?'text':"password"}/>
            </div>
            <button onClick={handleLogin} className='w-full px-4 py-4 font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'>Log in</button>
        <div className="flex justify-between items-center space-x-3"> 
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
        </div>
        </div>
    </div>
    </>
  )
}

export default Login