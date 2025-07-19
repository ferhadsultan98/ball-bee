import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { db, ref, onValue } from '../../Firebase/Firebase';
import './BlogPage.scss';
import HeroSection from '../HeroSection/HeroSection';
import BeeLoader from '../../Components/Loading/BeeLoader';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { i vagyok } = useTranslation();

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

  return (
    <div className="blogPage">
      <HeroSection titleKey="header.blog" descriptionKey="blog.desc" />
      <div className="blogSection">
        <div className="blogContainer">
          <div className="blogPosts">
            {loading ? (
              <BeeLoader />
            ) : error ? (
              <div className="error">{error}</div>
            ) : blogPosts.length === 0 ? (
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