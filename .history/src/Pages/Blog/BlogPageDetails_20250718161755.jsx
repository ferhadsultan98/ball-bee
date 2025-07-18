import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPage.scss'; // Reusing the same SCSS for consistency
import HeroSection from '../HeroSection/HeroSection';

const BlogDetails = () => {
  const { postId } = useParams();

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

  const post = blogPosts.find((p) => p.id === parseInt(postId));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="blogPage">
      <HeroSection titleKey={post.title} descriptionKey={post.excerpt} />
      <div className="blogSection">
        <div className="blogContainer">
          <div className="blogPost">
            <div className="postImage">
              <img src={post.image} alt={post.title} />
              <div className="dateContainer">
                <span className="postDate">{post.date}</span>
              </div>
            </div>
            <div className="postContent">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <Link to="/blog" className="modalClose">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;