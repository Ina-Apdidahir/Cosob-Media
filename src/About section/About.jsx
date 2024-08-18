import styles from './About.module.css'
import { useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import photopgraphy from '../assets/web Images/photopgraphy.png'
import Tribot from '../assets/web Images/Welpapers/Tripot.png'

function About() {


    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(location.pathname === '/'); // Initial state

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location]);

    const HeadClass = isHomePage ? styles.Head : `${styles.Head} ${styles.hide}`;
    const Head_master = isHomePage ? `${styles.Head_master} ${styles.hide}` : styles.Head_master;


    // ____________________ COUNTING ____________________//

    let [clientCount, setClientCount] = useState(0);
    let [projectCount, setProjectCount] = useState(0);

    useEffect(() => {
        // Simulate counting animation on initial render
        const intervalId = setInterval(() => {
            if (clientCount <= 150) {
                setClientCount(clientCount++);
            }
            if (projectCount <= 10) {
                setProjectCount(projectCount++);
            }
        }, 100); // Adjust interval for desired animation speed (in milliseconds)

        return () => clearInterval(intervalId); // Cleanup function to stop animation
    }, []);

    // ____________________ COUNTING ____________________//


    /////////////////// Scroll animations ////////////////////////

    useEffect(() => {
        const handleScroll = () => {
            const Txtelements = document.querySelectorAll(`.${styles.text_section}`);
            const Imgelements = document.querySelectorAll(`.${styles.img}`);
            const projectelements = document.querySelectorAll(`.${styles.projects}`);
            const HMrelements = document.querySelectorAll(`.${styles.Head_master}`);

            Txtelements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const partiallyInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (partiallyInView) {
                    el.classList.add(styles.visible);
                } else {
                    el.classList.remove(styles.visible);
                }
            });
            Imgelements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const partiallyInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (partiallyInView) {
                    el.classList.add(styles.visible);
                } else {
                    el.classList.remove(styles.visible);
                }
            });

            projectelements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const partiallyInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (partiallyInView) {
                    el.classList.add(styles.visible);
                } else {
                    el.classList.remove(styles.visible);
                }
            });

            HMrelements.forEach((el) => {
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
            <div className={Head_master} >
                <h1>About Us</h1>
            </div>
            <div className={styles.about_container}>
                <div className={HeadClass}>
                    <h1>About Us</h1>
                </div>
                <div className={styles.About}>
                    <div className={styles.top}>
                        <div className={styles.image} >
                            <img className={`${styles.img} ${styles.scale}`} src={photopgraphy} alt="" />
                        </div>
                        <div className={styles.texts}>
                            <div className={`${styles.text_section} ${styles.from_left}`}>
                                <h1>Photos that Speak Volumes </h1>
                                <p>
                                    Our photographers capture the essence of your brand, product, or event.
                                    We use our expertise to craft stunning visuals that tell your story
                                    and resonate with your audience.
                                </p>
                            </div>
                            <div className={`${styles.text_section} ${styles.from_left}`}>
                                <h1>Branding that Stands Out </h1>
                                <p>
                                    Build a strong brand identity with our team. We help you develop a unique voice,
                                    design a captivating logo, and craft messaging that effectively
                                    communicates your value.
                                </p>
                            </div>
                            <div className={`${styles.text_section} ${styles.from_left}`}>
                                <h1>Videos that Captivate</h1>
                                <p>
                                    Move beyond the ordinary with our videographers. We create dynamic and
                                    engaging videos that connect with your viewers on a deeper level,
                                    leaving a lasting impression.
                                </p>
                            </div>
                            <div className={`${styles.text_section} ${styles.from_left}`}>
                                <h1>Events that Impress </h1>
                                <p>
                                    Planning an event shouldn't be stressful. We handle everything from concept
                                    to execution, ensuring a flawless and memorable experience for your guests.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.texts}>
                            <div className={`${styles.text_section} ${styles.from_left}`}>
                                <h1>Expriences and Projects</h1>
                                <p>
                                    For over a decade, Cosob Media Works has been a trusted partner for businesses
                                    and individuals seeking to elevate their online presence.
                                    We've captured stunning photography for global brands,
                                    crafted captivating videos that have garnered millions of views,
                                    and executed flawless events that leave a lasting impression.
                                    Let our experience turn your vision into reality.
                                </p>
                            </div>
                            <div className={`${styles.projects} ${styles.scale}`}>
                                <div className={styles.project}>
                                    <h2>{clientCount}+</h2>
                                    <small>Clients served</small>
                                </div>
                                <div className={styles.project}>
                                    <h2>{projectCount}+</h2>
                                    <small>Projects</small>
                                </div>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <img className={`${styles.img} ${styles.scale}`} src={Tribot} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About 