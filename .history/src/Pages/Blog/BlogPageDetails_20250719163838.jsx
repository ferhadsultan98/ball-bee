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

  return (
    <div className="blogDetailsPage">
      <HeroSection
        titleKey={post ? post.title[i18n.language] : 'Blog'}
        descriptionKey={post ? post.excerpt[i18n.language] : 'Explore our blog posts'}
      />
      <div className="blogDetailsSection">
        <div className="blogDetailsContainer">
          {loading ? (
           
          ) : error ? (
            <div className="blogDetailsNoPosts">{error}</div>
          ) : !post ? (
            <div className="blogDetailsNoPosts">Post not found</div>
          ) : (
            <div className="blogDetailsPost">
              <div className="blogDetailsPostImage">
                <img src={post.image} alt={post.title[i18n.language]} />
                <div className="blogDetailsDateContainer">
                  <span className="blogDetailsPostDate">{post.date}</span>
                </div>
              </div>
              <div className="blogDetailsPostContent">
                <div className="blogDetailsPostMeta">
                  <span className="blogDetailsPostAuthor">By {post.author}</span>
                </div>
                <h1>{post.title[i18n.language]}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content[i18n.language] }} />
                <div className="blogDetailsPostHashtags">{post.hashtags}</div>
                <div className="blogDetailsPostActions">
                  <Link to="/blog" className="blogDetailsBackButton">
                    Back to Blog
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPageDetails;