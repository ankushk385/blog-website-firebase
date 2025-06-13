import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../Context/context';
import './Write.css';

const Write = () => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handlePublish = async () => {
    try {
      let imageUrl = "";

      if (file) {
        const fileRef = ref(storage, `postImages/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(fileRef);
      }

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
    <div className="write-page">
      <div className="write-content">
        <input
          type="text"
          placeholder="Title"
          className="write-title-input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-container">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>

      <div className="write-sidebar">
        <div className="sidebar-section">
          <h2>Publish</h2>
          <p>Status: <b>Draft</b></p>
          <p>Visibility: <b>Public</b></p>

          <label htmlFor="file" className="upload-label">Upload Image</label>
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="sidebar-buttons">
            <button className="draft-btn">Save as Draft</button>
            <button className="publish-btn" onClick={handlePublish}>Publish</button>
          </div>
        </div>

        <div className="sidebar-section">
          <h2>Category</h2>
          {["art", "science", "technology", "cinema", "design", "food"].map((cat) => (
            <div key={cat} className="category-option">
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
