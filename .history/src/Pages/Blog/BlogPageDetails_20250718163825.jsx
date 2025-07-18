import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, ref, onValue } from '../../firebase'; // Adjust path to your firebase.js
import HeroSection from '../HeroSection/HeroSection';
import './BlogPageDetails.scss';

const BlogPageDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch specific blog post from Firebase
  useEffect(() => {
    const postRef = ref(db, `blogPosts/${postId}`);
    const unsubscribe = onValue(
      postRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPost({ id: postId, ...data });
        } else {
          setPost(null);
        }
        setLoading(false);
      },
      (error) => {
        setError('Failed to fetch blog post.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  if (loading) {
    return <div className="blogPage">Loading...</div>;
  }

  if (error) {
    return (
      <div className="blogPage">
        <div className="blogSection">
          <div className="blogContainer">
            <div className="notFound">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blogPage">
        <div className="blogSection">
          <div className="blogContainer">
            <div className="notFound">Post not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blogPage">
      <HeroSection titleKey={post.title} descriptionKey={post.excerpt} />
      <div className="blogSection">
        <div className="blogContainer">
          <div className="blogPost">
            <div className="postImage">
              <img src={post.image} alt={post.title} />
              <div className="metaOverlay">
                <span className="postCategory">{post.category}</span>
                <span className="postDate">{post.date}</span>
              </div>
            </div>
            <div className="postContent">
              <div className="postMeta">
                <span className="postAuthor">By {post.author}</span>
              </div>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <div className="postActions">
                <Link to="/blog" className="backButton">
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageDetails;