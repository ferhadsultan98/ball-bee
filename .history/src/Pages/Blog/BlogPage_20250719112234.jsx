import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, ref, onValue } from '../../Firebase/Firebase';
import './BlogPage.scss';
import HeroSection from '../HeroSection/HeroSection';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en'); // Default to English

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

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

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
          <div className="languageSelector">
            <button onClick={() => handleLanguageChange('en')}>EN</button>
            <button onClick={() => handleLanguageChange('az')}>AZ</button>
            <button onClick={() => handleLanguageChange('ru')}>RU</button>
          </div>
          <div className="blogPosts">
            {blogPosts.length === 0 ? (
              <div className="noPosts">No blog posts available.</div>
            ) : (
              blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="blogPost">
                  <div className="postImage">
                    <img src={post.image} alt={post.title[language]} />
                    <div className="dateContainer">
                      <span className="postDate">{post.date}</span>
                    </div>
                  </div>
                  <div className="postContent">
                    <h3>{post.title[language]}</h3>
                    <p>{post.excerpt[language]}</p>
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