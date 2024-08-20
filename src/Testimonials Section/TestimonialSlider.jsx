// import { PortableText } from '@portabletext/react';
import styles from './Testmonials.module.css';
import React, { useState, useEffect } from 'react';


import client from '../../Sanity Client/SanityClient';
import { PortableText } from '@portabletext/react';

const TestimonialSlider = () => {

  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `*[ _type == "testimonial" ] {
      clientName,
      refrence,
      clientFeedback
  }`;
    client.fetch(query)
      .then(data => {
        setTestimonials(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTwoPerSlide, setIsTwoPerSlide] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTwoPerSlide(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setCurrentSlide((currentSlide) => {
          if (isTwoPerSlide) {
            return currentSlide >= Math.ceil(testimonials.length / 2) - 1
              ? 0
              : currentSlide + 1;
          } else {
            return currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1;
          }
        });
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isPaused, currentSlide, testimonials.length, isTwoPerSlide]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

 


  const components = {
    types: {
      space: ({ value }) => {
        // Render the space component
        return (
          <div style={{ height: value.height }} className={styles.space} />
        );
      },
    }
  }


  return (
    <div
      className={styles.reviews}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.rev_container}>
        {isTwoPerSlide
          ? testimonials.reduce((rows, testimonial, idx) => {
            if (idx % 2 === 0) rows.push([testimonial]);
            else rows[rows.length - 1].push(testimonial);
            return rows;
          }, []).map((row, idx) => (
            <div
              key={idx}
              className={`${currentSlide === idx ? styles.slide : styles.slide_hidden}`}
            >
              {row.map((testimonial, index) => (
                <div
                  id={styles.review}
                  key={index}
                  className={styles.single_review}
                >
                  <div className={styles.Review_head}>
                    <h2>{testimonial?.clientName}</h2>
                    <p>{testimonial?.refrence}</p>
                  </div>
                  <div className={styles.Review_body}>
                    < PortableText value={testimonial?.clientFeedback} components={components} />
                  </div>
                </div>
              ))}
            </div>
          ))
          : testimonials.map((testimonial, idx) => (
            <div
              id={styles.review}
              key={idx}
              className={`${currentSlide === idx ? styles.slide : styles.slide_hidden}`}
            >
              <div className={styles.Review_head}>
                <h2>{testimonial?.clientName}</h2>
                <p>{testimonial?.refrence}</p>
              </div>
              <div className={styles.Review_body}>
                < PortableText value={testimonial?.clientFeedback} components={components} />
              </div>
            </div>
          ))}
      </div>
      <div className={styles.indicators}>
        {(isTwoPerSlide
          ? new Array(Math.ceil(testimonials.length / 2)).fill(0)
          : testimonials
        ).map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={
              currentSlide === idx
                ? `${styles.indicator}`
                : `${styles.indicator_inactive}`
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
