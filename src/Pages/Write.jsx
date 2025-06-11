import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../Context/context';

const Write = () => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handlePublish = async () => {
    try {
      let imageUrl = "";

      // 1. Upload file if exists
      if (file) {
        const fileRef = ref(storage, `postImages/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(fileRef);
      }

      // 2. Save post to Firestore
      await addDoc(collection(db, "posts"), {
        title,
        content: value,
        category,
        imageUrl,
        author: currentUser.email,
        createdAt: serverTimestamp(),
      });

      alert("Post published!");
    } catch (err) {
      console.error("Error publishing post:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
        <div className="editor-container">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>Status: <b>Draft</b></span>
          <span>Visibility: <b>Public</b></span>

          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">Upload Image</label>
          <button>Save as Draft</button>
          <button onClick={handlePublish}>Publish</button>
        </div>
        <div className="item">
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map((cat) => (
            <div key={cat}>
              <input
                type="radio"
                id={cat}
                value={cat}
                name="cat"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
