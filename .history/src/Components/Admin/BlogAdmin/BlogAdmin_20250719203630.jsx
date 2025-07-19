import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, ref, set, onValue, update, remove } from '../../../Firebase/Firebase';
import './BlogAdmin.scss';

const BlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: { en: '', az: '', ru: '' },
    excerpt: { en: '', az: '', ru: '' },
    content: { en: '', az: '', ru: '' },
    image: null,
    hashtags: '',
    author: '',
  });
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');

  useEffect(() => {
    const postsRef = ref(db, 'blogPosts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      setBlogPosts(data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : []);
    });
  }, []);

  const handleInputChange = (e, lang = selectedLang) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const file = e.target.files[0];
      if (editingPost) {
        setEditingPost({ ...editingPost, image: file });
      } else {
        setNewPost({ ...newPost, image: file });
      }
    } else if (name === 'hashtags' || name === 'author') {
      if (editingPost) {
        setEditingPost({ ...editingPost, [name]: value });
      } else {
        setNewPost({ ...newPost, [name]: value });
      }
    } else {
      if (editingPost) {
        setEditingPost({
          ...editingPost,
          [name]: { ...editingPost[name], [lang]: value },
        });
      } else {
        setNewPost({
          ...newPost,
          [name]: { ...newPost[name], [lang]: value },
        });
      }
    }
  };

  const handleEditorChange = (content, name, lang = selectedLang) => {
    if (editingPost) {
      setEditingPost({
        ...editingPost,
        [name]: { ...editingPost[name], [lang]: content },
      });
    } else {
      setNewPost({
        ...newPost,
        [name]: { ...newPost[name], [lang]: content },
      });
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    if (!newPost.title.en || !newPost.excerpt.en || !newPost.content.en || !newPost.image) {
      setError('All English fields and image are required.');
      return;
    }
    try {
      const postId = Date.now().toString();
      const imageUrl = await uploadImage(newPost.image);
      await set(ref(db, `blogPosts/${postId}`), {
        ...newPost,
        id: postId,
        date: new Date().toISOString().split('T')[0],
        image: imageUrl,
      });
      setNewPost({
        title: { en: '', az: '', ru: '' },
        excerpt: { en: '', az: '', ru: '' },
        content: { en: '', az: '', ru: '' },
        image: null,
        hashtags: '',
        author: '',
      });
      setError('');
    } catch (err) {
      setError('Failed to add post.');
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();
    if (!editingPost.title.en || !editingPost.excerpt.en || !editingPost.content.en) {
      setError('All English fields are required.');
      return;
    }
    try {
      const imageUrl =
        editingPost.image instanceof File ? await uploadImage(editingPost.image) : editingPost.image;
      await update(ref(db, `blogPosts/${editingPost.id}`), {
        ...editingPost,
        image: imageUrl,
      });
      setEditingPost(null);
      setError('');
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  const uploadImage = async (file) => {
    return URL.createObjectURL(file);
  };

  const deletePost = async (postId) => {
    try {
      await remove(ref(db, `blogPosts/${postId}`));
    } catch (err) {
      setError('Failed to delete post.');
    }
  };

  const startEditing = (post) => {
    setEditingPost(post);
    setError('');
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <div className="blogAdmin">
      <div className="adminSection">
        <div className="adminContainer">
          <h1 className="sectionTitle">Blog Admin Panel</h1>
          {error && <div className="errorMessage">{error}</div>}

          <div className="languageTabs">
            {['en', 'az', 'ru'].map((lang) => (
              <button
                key={lang}
                className={`langTab ${selectedLang === lang ? 'active' : ''}`}
                onClick={() => setSelectedLang(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <form className="adminForm" onSubmit={editingPost ? updatePost : addPost}>
            <div className="languageSection">
              <div className="formGroup">
                <label>Title ({selectedLang})</label>
                <input
                  type="text"
                  name="title"
                  value={editingPost ? editingPost.title[selectedLang] : newPost.title[selectedLang]}
                  onChange={(e) => handleInputChange(e)}
                  placeholder={`Enter post title (${selectedLang})`}
                />
              </div>
              <div className="formGroup">
                <label>Excerpt ({selectedLang})</label>
                <textarea
                  name="excerpt"
                  value={editingPost ? editingPost.excerpt[selectedLang] : newPost.excerpt[selectedLang]}
                  onChange={(e) => handleInputChange(e)}
                  placeholder={`Enter post excerpt (${selectedLang})`}
                />
              </div>
              <div className="formGroup">
                <label>Content ({selectedLang})</label>
                <ReactQuill
                  theme="snow"
                  value={editingPost ? editingPost.content[selectedLang] : newPost.content[selectedLang]}
                  onChange={(content) => handleEditorChange(content, 'content')}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>
            </div>
            <div className="formGroup">
              <label>Image</label>
              <input type="file" name="image" accept="image/*" onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="formGroup">
              <label>Hashtags</label>
              <input
                type="text"
                name="hashtags"
                value={editingPost ? editingPost.hashtags : newPost.hashtags}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter hashtags (e.g., #tech #blog)"
              />
            </div>
            <div className="formGroup">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={editingPost ? editingPost.author : newPost.author}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter author name"
              />
            </div>
            <button type="submit" className="submitButton">
              {editingPost ? 'Update Post' : 'Add Post'}
            </button>
            {editingPost && (
              <button type="button" className="cancelButton" onClick={() => setEditingPost(null)}>
                Cancel
              </button>
            )}
          </form>

          <div className="postsList">
            {blogPosts.map((post) => (
              <div key={post.id} className="postItem">
                <div className="postImage">
                  <img src={post.image} alt={post.title.en} />
                </div>
                <div className="postDetails">
                  <h3>{post.title[selectedLang]}</h3>
                  <p>{post.excerpt[selectedLang]}</p>
                  <div className="postActions">
                    <button className="editButton" onClick={() => startEditing(post)}>
                      Edit
                    </button>
                    <button className="deleteButton" onClick={() => deletePost(post.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;