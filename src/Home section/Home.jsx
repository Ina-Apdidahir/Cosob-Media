
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

import React, { useEffect } from 'react';
import whiteArrow from '../assets/Icons/whiteArrow.png'


function Homesection() {

    /////////////////// Scroll animations ////////////////////////

    useEffect(() => {
        const handleScroll = () => {
            const SlideElement = document.querySelectorAll(`.${styles.Slide}`);
            const intouchelm = document.querySelectorAll(`.${styles.Homebtn}`);


            SlideElement.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const partiallyInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (partiallyInView) {
                    el.classList.add(styles.visible);
                } else {
                    el.classList.remove(styles.visible);
                }
            });

            intouchelm.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const partiallyInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (partiallyInView) {
                    el.classList.add(styles.visible);
                } else {
                    el.classList.remove(styles.visible);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run the function once to check the visibility on load

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /////////////////// Scroll animations ////////////////////////


    return (
        <div className={styles.container}>
            <div className={styles.inspire}>
                <h1 className={`${styles.SlideElement} ${styles.heading}`}>Where Creative process <br /> Happens</h1>
                <p className={`${styles.SlideElement} ${styles.paragraph}`}>Creating Memories That Lasts Alifetime </p>
                <Link to="/contact">
                    <button className={`${styles.Homebtn} ${styles.scale}`}>Get in Touch <img src={whiteArrow} alt="" /> </button>
                </Link>
            </div>
        </div>
    )

}

export default Homesection