import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../assets/url";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  let [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`${BASE_URL}/auth/register`, form);
      navigate("/login");
      toast.success("Please Login");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          toast.dark(`Email already exists`);
        } else {
          toast.error(err.response.data.message || "Register failed");
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
        <h3>
          <Link to={"/register"}>Register</Link>
        </h3>
      </nav>
      <div className="w-full flex justify-center items-center h-[70vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] rounded-lg md:w-[50%] py-8 px-6 border-2 border-slate-500">
          <h1 className="text-xl font-bold ">create an account</h1>
          <input
            className="w-full px-4 py-2 rounded-lg border-2 border-black outline-none"
            placeholder="Enter Your UserName"
            type="text"
            onChange={handleChange}
            value={form.username}
            name="username"
          />
          <input
            className="w-full px-4 py-2 rounded-lg border-2 border-black outline-none"
            placeholder="Enter Your Email"
            type="email"
            onChange={handleChange}
            value={form.email}
            name="email"
          />
          <div className="w-full relative ">
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <input
              className="w-full px-4 py-2 rounded-lg border-2 border-black outline-none"
              placeholder="Enter Your Password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              value={form.password}
              name="password"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>
          <div className="flex justify-between items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
