import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path as needed
import { motion } from 'framer-motion';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRef = collection(db, 'posts');
        let q = postsRef;

        // If category exists in the query string like ?cat=art
        if (cat) {
          const categoryValue = cat.split('=')[1];
          q = query(postsRef, where('category', '==', categoryValue));
        }

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
        console.log(fetchedPosts)
      } catch (error) {
        console.log('Home page error:', error);
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
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="post-image">
              <img src={post.imageUrl} alt="this is an alt for the img" />
            </div>
            <div className="post-content">
              
                <h2>{post.title}</h2>
             
              <p>{post.content}</p>
<Link to={`/post/${post.id}`}>
              <button>Read more...</button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
