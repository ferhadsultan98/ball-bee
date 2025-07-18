import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPageDetails.scss';
import HeroSection from '../HeroSection/HeroSection';

const BlogPageDetails = () => {
  const { postId } = useParams();

  const blogPosts = [
    {
      id: 1,
      title: 'Exploring Modern Web Design Trends',
      excerpt: 'Discover the latest trends in web design and how they enhance user experience.',
      image: 'https://via.placeholder.com/600x400',
      content: 'This is a full blog post content about modern web design trends. Learn about the latest tools, frameworks, and design patterns that are shaping the future of web development. From vibrant color schemes to innovative layouts, this post covers it all.',
      date: 'July 15, 2025'
    },
    {
      id: 2,
      title: 'The Art of Responsive Layouts',
      excerpt: 'Learn how to create responsive layouts that work across all devices.',
      image: 'https://via.placeholder.com/600x400',
      content: 'This post dives into the techniques for responsive design, including CSS Grid, Flexbox, and media queries. Discover how to build layouts that adapt seamlessly to any screen size, ensuring a great user experience.',
      date: 'July 10, 2025'
    },
    {
      id: 3,
      title: 'Minimalist Design Principles',
      excerpt: 'Embrace simplicity with minimalist design approaches for better UX.',
      image: 'https://via.placeholder.com/600x400',
      content: 'Minimalist design focuses on clarity and simplicity. This post explores the principles of minimalism, including the use of white space, clean typography, and intentional color choices to create user-friendly interfaces.',
      date: 'July 5, 2025'
    }
  ];

  const post = blogPosts.find((p) => p.id === parseInt(postId));

  if (!post) {
    return <div className="blogPage">Post not found</div>;
  }

  return (
    <div className="blogPage">
      <HeroSection titleKey={post.title} descriptionKey={post.excerpt} />
      <div className="blogSection">
        <div className="blogContainer">
          <div className="blogPost blogPostDetails">
            <div className="postImage">
              <img src={post.image} alt={post.title} />
              <div className="dateContainer">
                <span className="postDate">{post.date}</span>
              </div>
            </div>
            <div className="postContent">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <Link to="/blog" className="backButton">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageDetails;