import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { db, ref, onValue } from '../../Firebase/Firebase';
import HeroSection from '../HeroSection/HeroSection';
import './BlogPageDetails.scss';

const BlogPageDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { i18n } = useTranslation();

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
      <HeroSection titleKey={post.title[i18n.language]} descriptionKey={post.excerpt[i18n.language]} />
      <div className="blogSection">
        <div className="blogContainer">
          <div className="blogPost">
            <div className="postImage">
              <img src={post.image} alt={post.title[i18n.language]} />
              <div className="metaOverlay">
                <span className="postDate">{post.date}</span>
              </div>
            </div>
            <div className="postContent">
              <div className="postMeta">
                <span className="postAuthor">By {post.author}</span>
                <span className="postHashtags">{post.hashtags}</span>
              </div>
              <h1>{post.title[i18n.language]}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.content[i18n.language] }} />
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