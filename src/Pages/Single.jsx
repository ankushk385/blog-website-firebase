import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../Components/Menu';
import { AuthContext } from '../Context/context'
import moment from 'moment'
import { doc, getDoc, deleteDoc,updateDoc  } from "firebase/firestore";
import { db } from "../firebase"; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'; // adjust path as needed




const Single = () => {

const location = useLocation();
const navigate = useNavigate();

const postID = location.pathname.split("/")[2];

const {currentUser} = useContext(AuthContext);

const [post, setpost] = useState({})

const [isEditing, setIsEditing] = useState(false);
const [editData, setEditData] = useState({
  title: '',
  cat: '',
  content: ''
});

const [imageFile, setImageFile] = useState(null);






const handleDeletePost = async () => {
  try {
    await deleteDoc(doc(db, "posts", postID));
    console.log("Post deleted");
    navigate("/"); 
  } catch (error) {
    console.log("Delete error:", error);
  }
};

const handleUpdatePost = () => {
  setEditData({
    title: post.title,
    cat: post.cat,
    content: post.content
  });
  setIsEditing(true);
};

const submitUpdate = async () => {
  try {
    let imageUrl = post.postIMG; // fallback to existing

    // If new image selected, upload it
    if (imageFile) {
      const storageRef = ref(storage, `postImages/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          reject,
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              imageUrl = url;
              resolve();
            });
          }
        );
      });
    }

    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      title: editData.title,
      postIMG: imageUrl,
      cat: editData.cat,
      description: editData.description
    });

    alert("Post updated!");
    setIsEditing(false);
    window.location.reload(); // Or re-fetch the post data

  } catch (err) {
    console.error("Update error:", err);
    alert("Update failed.");
  }
};



useEffect(() => {
  const fetchData = async () => {
    try {
      const docRef = doc(db, "posts", postID); // 'posts' = collection name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setpost(docSnap.data());
        console.log("Post data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting post:", error);
    }
  };

  fetchData();
}, [postID]);



  return (
    <div className='single'>
      <div className="content">
        <div className="image">
          <img src={post.imageUrl} alt='random' />
        </div>
         <div className="user-image">
          <img src={post.userIMG} alt='random' />
          </div>
             
        <div className="user-info">
        <span>{post.author}</span>
        <p>{moment(post.createdAt).fromNow()}</p>
        
        {
          currentUser?.username===post.username  && <div className='edit'>
          <Link to={`/write?edit=2`}>          
          </Link>
          <img onClick={handleUpdatePost} src="https://cdn-icons-png.flaticon.com/512/5996/5996831.png" alt='random' />
          <img onClick={handleDeletePost} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png " alt='random' />
        </div>
        }   
        
        </div>

        <div className="content-title">
<h2>{post.title}</h2>
      </div>
      <div className="content-desc">
        {post.content}
        </div>   
      </div>    



      {isEditing && (
  <div className="edit-dialog">
    <h2>Edit Post</h2>
    <input
      type="text"
      placeholder="Title"
      value={editData.title}
      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
    />
   <input
  type="file"
  onChange={(e) => setImageFile(e.target.files[0])}
/>
{imageFile && <p>Selected image: {imageFile.name}</p>}
    <input
      type="text"
      placeholder="Category"
      value={editData.cat}
      onChange={(e) => setEditData({ ...editData, cat: e.target.value })}
    />
    <ReactQuill
      theme="snow"
      value={editData.content}
      onChange={(value) => setEditData({ ...editData, content: value })}
    />
    <button onClick={submitUpdate}>Submit</button>
    <button onClick={() => setIsEditing(false)}>Cancel</button>
  </div>
)}





        <Menu/>
    </div>
  )
}

export default Single
