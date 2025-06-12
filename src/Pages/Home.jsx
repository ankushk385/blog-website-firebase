// Pages/Home.js
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import "./Home.css"; // Make sure this file exists

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRef = collection(db, "posts");
        let q = postsRef;

        // Filter by category if provided
        if (cat) {
          const categoryValue = cat.split("=")[1];
          q = query(postsRef, where("category", "==", categoryValue));
        }

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="post"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="post-image">
              <img src={post.imageUrl} alt={post.title} />
            </div>
            <div className="post-content">
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <Link to={`/post/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
