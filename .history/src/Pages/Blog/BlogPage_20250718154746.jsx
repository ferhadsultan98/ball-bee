import React, { useState } from 'react';
import './BlogPage.scss';
import HeroSection from '../HeroSection/HeroSection';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Exploring Modern Web Design Trends',
      excerpt: 'Discover the latest trends in web design and how they enhance user experience.',
      image: 'https://via.placeholder.com/600x400',
      content: 'This is a full blog post content about modern web design trends...',
      date: 'July 15, 2025'
    },
    {
      id: 2,
      title: 'The Art of Responsive Layouts',
      excerpt: 'Learn how to create responsive layouts that work across all devices.',
      image: 'https://via.placeholder.com/600x400',
      content: 'This post dives into the techniques for responsive design...',
      date: 'July 10, 2025'
    },
    {
      id: 3,
      title: 'Minimalist Design Principles',
      excerpt: 'Embrace simplicity with minimalist design approaches for better UX.',
      image: 'https://via.placeholder.com/600x400',
      content: 'Minimalist design focuses on clarity and simplicity...',
      date: 'July 5, 2025'
    }
  ];

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="blogPage">
     <HeroSection titleKey="header.gallery" descriptionKey="gallery.desc" />
      <div className="blogSection">
        <div className="blogContainer">
          <div className="blogPosts">
            {blogPosts.map((post) => (
              <div key={post.id} className="blogPost" onClick={() => openModal(post)}>
                <div className="postImage">
                  <img src={post.image} alt={post.title} />
                  <div className="dateContainer">
                    <span className="postDate">{post.date}</span>
                  </div>
                </div>
                <div className="postContent">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedPost && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalClose" onClick={closeModal}>×</button>
            <img src={selectedPost.image} alt={selectedPost.title} />
            <div className="modalCaption">
              <h3>{selectedPost.title}</h3>
              <p>{selectedPost.content}</p>
              <span className="modalDate">{selectedPost.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;