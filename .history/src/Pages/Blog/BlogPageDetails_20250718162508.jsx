import React from 'react';
import { useParams, Link } from 'react-router-dom';
import HeroSection from '../HeroSection/HeroSection';
import './'
const BlogPageDetails = () => {
  const { postId } = useParams();

  const blogPosts = [
    {
      id: 1,
      title: 'Exploring Modern Web Design Trends',
      excerpt: 'Discover the latest trends in web design and how they enhance user experience.',
      image: 'https://via.placeholder.com/1200x600',
      content: 'This is a full blog post content about modern web design trends. Learn about vibrant color schemes, micro-interactions, and immersive storytelling that elevate user engagement.',
      date: 'July 15, 2025',
      author: 'Jane Doe',
      category: 'Web Design'
    },
    {
      id: 2,
      title: 'The Art of Responsive Layouts',
      excerpt: 'Learn how to create responsive layouts that work across all devices.',
      image: 'https://via.placeholder.com/1200x600',
      content: 'This post dives into the techniques for responsive design, including flexible grids, media queries, and adaptive images for seamless experiences.',
      date: 'July 10, 2025',
      author: 'John Smith',
      category: 'Development'
    },
    {
      id: 3,
      title: 'Minimalist Design Principles',
      excerpt: 'Embrace simplicity with minimalist design approaches for better UX.',
      image: 'https://via.placeholder.com/1200x600',
      content: 'Minimalist design focuses on clarity and simplicity, prioritizing content over decoration to create intuitive user experiences.',
      date: 'July 5, 2025',
      author: 'Emily Brown',
      category: 'Design'
    }
  ];

  const post = blogPosts.find((p) => p.id === parseInt(postId));

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