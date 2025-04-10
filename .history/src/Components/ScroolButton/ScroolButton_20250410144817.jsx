import { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFluttering, setIsFluttering] = useState(false);


  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);


  const scrollToTop = () => {
    setIsFluttering(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    

    setTimeout(() => {
      setIsFluttering(false);
    }, 1000);
  };

  return (
    <button
      className={`bee-scroll-top ${isVisible ? 'visible' : ''} ${isFluttering ? 'fluttering' : ''}`}
      onClick={scrollToTop}
      onMouseEnter={() => setIsFluttering(true)}
      onMouseLeave={() => setIsFluttering(false)}
      aria-label="Scroll to top"
    >
      <div className="bee-body">
        <div className="bee-wing left-wing"></div>
        <div className="bee-wing right-wing"></div>
        <div className="bee-face">
          <div className="bee-eye left-eye"></div>
          <div className="bee-eye right-eye"></div>
        </div>
        <div className="bee-stripes">
          <div className="stripe"></div>
          <div className="stripe"></div>
          <div className="stripe"></div>
        </div>
        <div className="bee-stinger"></div>
      </div>
    </button>
  );
};

export default BeeScrollTopButton;