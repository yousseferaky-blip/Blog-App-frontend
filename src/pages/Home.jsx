import { useContext, useEffect, useState, useRef } from "react";
import HomePosts from "../component/HomePosts";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import axios from "axios";
import { BASE_URL } from "../assets/url";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { user,getUser } = useContext(UserContext);
  const isMounted = useRef(true); 

  const FetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/post`,{ withCredentials: true });

      if (isMounted.current) {
        setPosts(res.data.posts);
        if (res.data.posts.length >= 1) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchPosts();
    return () => {
      isMounted.current = false;
    };
  }, []); 

  return (
    <>
      <div className="px-2 md:px-[100px]">
        <Navbar />
        <div>
          {noResults ? (
            <>
              {posts.map((post) => (
                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                  <HomePosts key={post._id} post={post} />
                </Link>
              ))}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
