import React, { useState, useEffect } from 'react';
import { db, ref, set, onValue, update, remove } from '../../../Firebase/Firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './BlogAdmin.scss';

const BlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: null,
    hashtags: '',
    author: ''
  });
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState('');

  // Fetch blog posts from Firebase
  useEffect(() => {
    const postsRef = ref(db, 'blogPosts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setBlogPosts(postsArray);
      } else {
        setBlogPosts([]);
      }
    });
  }, []);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingPost) {
      setEditingPost({ ...editingPost, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  // Handle content change for ReactQuill
  const handleContentChange = (value) => {
    if (editingPost) {
      setEditingPost({ ...editingPost, content: value });
    } else {
      setNewPost({ ...newPost, content: value });
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (editingPost) {
          setEditingPost({ ...editingPost, image: reader.result });
        } else {
          setNewPost({ ...newPost, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new post to Firebase
  const addPost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.excerpt || !newPost.content) {
      setError('Title, excerpt, and content are required.');
      return;
    }
    try {
      const postId = Date.now().toString();
      await set(ref(db, `blogPosts/${postId}`), {
        ...newPost,
        id: postId,
        date: new Date().toISOString().split('T')[0]
      });
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        image: null,
        hashtags: '',
        author: ''
      });
      setError('');
    } catch (err) {
      setError('Failed to add post.');
    }
  };

  // Start editing a post
  const startEditing = (post) => {
    setEditingPost(post);
    setError('');
  };

  // Update post in Firebase
  const updatePost = async (e) => {
    e.preventDefault();
    if (!editingPost.title || !editingPost.excerpt || !editingPost.content) {
      setError('Title, excerpt, and content are required.');
      return;
    }
    try {
      await update(ref(db, `blogPosts/${editingPost.id}`), editingPost);
      setEditingPost(null);
      setError('');
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  // Delete post from Firebase
  const deletePost = async (postId) => {
    try {
      await remove(ref(db, `blogPosts/${postId}`));
    } catch (err) {
      setError('Failed to delete post.');
    }
  };

  // ReactQuill toolbar configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  return (
    <div className="blogAdmin">
      <div className="adminSection">
        <div className="adminContainer">
          <h1 className="sectionTitle">Blog Admin Panel</h1>
          {error && <div className="errorMessage">{error}</div>}

          {/* Form for Adding/Editing Post */}
          <form className="adminForm" onSubmit={editingPost ? updatePost : addPost}>
            <div className="formGroup">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={editingPost ? editingPost.title : newPost.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
              />
            </div>
            <div className="formGroup">
              <label>Excerpt</label>
              <textarea
                name="excerpt"
                value={editingPost ? editingPost.excerpt : newPost.excerpt}
                onChange={handleInputChange}
                placeholder="Enter post excerpt"
              />
            </div>
            <div className="formGroup">
              <label>Content</label>
              <ReactQuill
                value={editingPost ? editingPost.content : newPost.content}
                onChange={handleContentChange}
                modules={modules}
                placeholder="Enter post content"
              />
            </div>
            <div className="formGroup">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="formGroup">
              <label>Hashtags</label>
              <input
                type="text"
                name="hashtags"
                value={editingPost ? editingPost.hashtags : newPost.hashtags}
                onChange={handleInputChange}
                placeholder="Enter hashtags (e.g. #tag1 #tag2)"
              />
            </div>
            <div className="formGroup">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={editingPost ? editingPost.author : newPost.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
              />
            </div>
            <button type="submit" className="submitButton">
              {editingPost ? 'Update Post' : 'Add Post'}
            </button>
            {editingPost && (
              <button
                type="button"
                className="cancelButton"
                onClick={() => setEditingPost(null)}
              >
                Cancel
              </button>
            )}
          </form>

          {/* Blog Posts List */}
          <div className="postsList">
            {blogPosts.map((post) => (
              <div key={post.id} className="postItem">
                <div className="postImage">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="postDetails">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="postMeta">
                    <span>{post.date}</span> | <span>{post.author}</span> |{' '}
                    <span>{post.hashtags}</span>
                  </div>
                  <div className="postActions">
                    <button
                      className="editButton"
                      onClick={() => startEditing(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => deletePost(post.id)}
                    >
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