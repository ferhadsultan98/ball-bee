import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { db, ref, onValue } from '../../Firebase/Firebase';
import './BlogPage.scss';
import HeroSection from '../HeroSection/HeroSection';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { i18n } = useTranslation();

  useEffect(() => {
    const postsRef = ref(db, 'blogPosts');
    const unsubscribe = onValue(
      postsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setBlogPosts(postsArray);
        } else {
          setBlogPosts([]);
        }
        setLoading(false);
      },
      (error) => {
        setError('Failed to fetch blog posts.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="blogPage">Loading...</div>;
  }

  if (error) {
    return <div className="blogPage">{error}</div>;
  }

  return (
    <div className="blogPage">
      <HeroSection titleKey="Blog title" descriptionKey="Blog description" />
      <div className="blogSection">
        <div className="blogContainer">
          <div className="blogPosts">
            {blogPosts.length === 0 ? (
              <div className="noPosts">No blog posts available.</div>
            ) : (
              blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="blogPost">
                  <div className="postImage">
                    <img src={post.image} alt={post.title[i18n.language]} />
                    <div className="dateContainer">
                      <span className="postDate">{post.date}</span>
                    </div>
                  </div>
                  <div className="postContent">
                    <h3>{post.title[i18n.language]}</h3>
                    <p>{post.excerpt[i18n.language]}</p>
                    <div className="postMeta">
                      <span className="postAuthor">By {post.author}</span>
                      <span className="postHashtags">{post.hashtags}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;