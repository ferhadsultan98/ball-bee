import React from 'react';
import './HoneyTestimonials.scss';
import Hippocrates from '../../../assets/Homes/hippocrates.png'
import Ari from '../../../assets/Homes/hippocrates.png'
import Hippocrates from '../../../assets/Homes/hippocrates.png'
const HoneyTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Hippokrates",
      title: "Qədim Yunan Həkimi",
      quote: "Bal təbiətin ən qiymətli hədiyyəsidir. O, həm şəfa, həm də uzunömürlülük mənbəyidir.",
      image: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Aristotel",
      title: "Filosof və Alim",
      quote: "Arılar kiçik canlılar olsalar da, onların istehsal etdiyi bal insanlığa böyük töhfədir.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Viktor Hüqo",
      title: "Fransız Yazıçısı",
      quote: "Həyat bir çiçəkdir, sevgi isə onun balıdır. Bal kimi şirin və qiymətli heç nə yoxdur.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    }
  ];

  return (
    <section className="honeyTestimonials">
      <div className="honeyContainer">
        <div className="honeyHeader">
          <div className="honeycombPattern"></div>
          <h2 className="sectionTitle">Bal Haqqında Düşüncələr</h2>
          <p className="sectionSubtitle">Tarix boyu məşhur şəxsiyyətlərin bal haqqında deyimləri</p>
        </div>

        <div className="testimonialsGrid">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`testimonialCard card${index + 1}`}>
              <div className="honeyDrip"></div>
              <div className="quoteIcon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                </svg>
              </div>
              
              <div className="testimonialContent">
                <p className="testimonialQuote">{testimonial.quote}</p>
              </div>

              <div className="testimonialAuthor">
                <div className="authorImage">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="honeyGlow"></div>
                </div>
                <div className="authorInfo">
                  <h3 className="authorName">{testimonial.name}</h3>
                  <p className="authorTitle">{testimonial.title}</p>
                </div>
              </div>

              <div className="hexagonDecor">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="beeDecoration">
          <div className="bee bee1">🐝</div>
          <div className="bee bee2">🐝</div>
          <div className="bee bee3">🐝</div>
        </div>
      </div>
    </section>
  );
};

export default HoneyTestimonials;