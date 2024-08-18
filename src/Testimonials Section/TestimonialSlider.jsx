import styles from './Testmonials.module.css';
import React, { useState, useEffect } from 'react';

const TestimonialSlider = ({ reviews }) => {
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
            return currentSlide >= Math.ceil(reviews.length / 2) - 1
              ? 0
              : currentSlide + 1;
          } else {
            return currentSlide === reviews.length - 1 ? 0 : currentSlide + 1;
          }
        });
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isPaused, currentSlide, reviews.length, isTwoPerSlide]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className={styles.reviews}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.rev_container}>
        {isTwoPerSlide
          ? reviews.reduce((rows, comment, idx) => {
              if (idx % 2 === 0) rows.push([comment]);
              else rows[rows.length - 1].push(comment);
              return rows;
            }, []).map((row, idx) => (
              <div
                key={idx}
                className={`${currentSlide === idx ? styles.slide : styles.slide_hidden}`}
              >
                {row.map((comment, index) => (
                  <div
                    id={styles.review}
                    key={index}
                    className={styles.single_review}
                  >
                    <div className={styles.Review_head}>
                      <h2>{comment.author}</h2>
                      <p>{comment.website}</p>
                    </div>
                    <div className={styles.Review_body}>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          : reviews.map((comment, idx) => (
              <div
                id={styles.review}
                key={idx}
                className={`${currentSlide === idx ? styles.slide : styles.slide_hidden}`}
              >
                <div className={styles.Review_head}>
                  <h2>{comment.author}</h2>
                  <p>{comment.website}</p>
                </div>
                <div className={styles.Review_body}>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
      </div>
      <div className={styles.indicators}>
        {(isTwoPerSlide
          ? new Array(Math.ceil(reviews.length / 2)).fill(0)
          : reviews
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
