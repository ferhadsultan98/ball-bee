import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { db, ref, onValue, increment, update } from '../../Firebase/Firebase';
import HeroSection from '../HeroSection/HeroSection';
import './BlogPageDetails.scss';
import BeeLoader from '../../Components/Loading/BeeLoader';

const BlogPageDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const postRef = ref(db, `blogPosts/${postId}`);
    
    // Increment view count
    update(ref(db, `blogPosts/${postId}`), {
      viewCount: increment(1)
    }).catch((err) => {
      console.error('Failed to update view count:', err);
    });

    // Fetch post data and view count
    const unsubscribe = onValue(
      postRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPost({ id: postId, ...data });
          setViewCount(data.viewCount || 0);
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
      <HeroSection titleKey="blog.details.title" descriptionKey="blog.details.desc" />
      <div className="blogDetailsSection">
        <div className="blogDetailsContainer">
          {loading ? (
            <BeeLoader />
          ) : error ? (
            <div className="blogDetailsNoPosts">{error}</div>
          ) : !post ? (
            <div className="blogDetailsNoPosts">Post not found</div>
          ) : (
            <div className="blogDetailsPost">
              <div className="blogDetailsPostHeader">
                <h1>{post.title[i18n.language]}</h1>
                <div className="blogDetailsDateContainer">
                  <span className="blogDetailsPostDate">{post.date}</span>
                  <span className="blogDetailsViewCount">Views: {viewCount}</span>
                </div>
              </div>
              <div className="blogDetailsPostImage">
                <img src={post.image} alt={post.title[i18n.language]} />
              </div>
              <div className="blogDetailsPostContent">
                <div className="blogDetailsPostMeta">
                  <span className="blogDetailsPostAuthor">By {post.author}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content[i18n.language] }} />
                <div className="blogDetailsPostHashtags">{post.hashtags}</div>
                <div className="blogDetailsPostActions">
                  <Link to="/blog" className="blogDetailsBackButton">
                    {t("blog.details.backtoBlog")}
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