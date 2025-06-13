import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../Components/Menu';
import { AuthContext } from '../Context/context';
import moment from 'moment';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Single.css';

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postID = location.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);

  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    cat: '',
    content: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', postID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setPost(docSnap.data());
    };
    fetchPost();
  }, [postID]);

  const handleDeletePost = async () => {
    await deleteDoc(doc(db, 'posts', postID));
    navigate('/');
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
      let imageUrl = post.imageUrl;
      if (imageFile) {
        const storageRef = ref(storage, `postImages/${Date.now()}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
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

      await updateDoc(doc(db, 'posts', postID), {
        title: editData.title,
        imageUrl,
        cat: editData.cat,
        content: editData.content
      });

      alert('Post updated!');
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="single-page">
      <div className="single-container">
        <div className="post-content">
          <img className="post-image" src={post.imageUrl} alt="Post" />
          <div className="post-meta">
            <span>{post.author}</span>
            <span>{moment(post.createdAt?.toDate?.()).fromNow()}</span>
            {currentUser?.email === post.author && (
              <div className="edit-controls">
                <img onClick={handleUpdatePost} src="https://cdn-icons-png.flaticon.com/512/5996/5996831.png" alt="Edit" />
                <img onClick={handleDeletePost} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="Delete" />
              </div>
            )}
          </div>
          <h2 className="post-title">{post.title}</h2>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

          {isEditing && (
            <div className="edit-section">
              <h3>Edit Post</h3>
              <input
                type="text"
                placeholder="Title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
              <input
                type="text"
                placeholder="Category"
                value={editData.cat}
                onChange={(e) => setEditData({ ...editData, cat: e.target.value })}
              />
              <ReactQuill
                className="edit-quill"
                theme="snow"
                value={editData.content}
                onChange={(val) => setEditData({ ...editData, content: val })}
              />
              <div className="edit-buttons">
                <button onClick={submitUpdate} className="update-btn">Submit</button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          )}
        </div>

        <div className="sidebar">
          <h4 className="sidebar-heading">Other stories we think you'll enjoy</h4>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Single;
