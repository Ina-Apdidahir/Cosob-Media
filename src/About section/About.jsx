import styles from './About.module.css'
import { useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import client from '../../Sanity Client/SanityClient';
import { PortableText } from '@portabletext/react';

import Objectives from './objectives.jsx';

function About() {

    //__________________________ Scroll animations ____________________\\

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    } else {
                        entry.target.classList.remove(styles.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const observeElements = () => {
            const elements = document.querySelectorAll(`.${styles.Scale}`);
            elements.forEach((el) => observer.observe(el));

            const SLide = document.querySelectorAll(`.${styles.SLide}`);
            SLide.forEach((el) => observer.observe(el));
        };

        observeElements(); // Initial run
        const observerMutation = new MutationObserver(observeElements);
        observerMutation.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            observerMutation.disconnect();
        };
    }, []);

    //__________________________ Scroll animations ____________________\\

    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(location.pathname === '/'); // Initial state

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location]);

    const HeadClass = isHomePage ? styles.Head : `${styles.Head} ${styles.hide}`;
    const Head_master = isHomePage ? `${styles.Head_master} ${styles.hide}` : styles.Head_master;



    const [about, setAbout] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    let fetchedClients;
    let fetchedProjects;

    useEffect(() => {
        const query = `*[ _type == "about" ] {
            aboutImage1 {
              asset -> {
                _id,
                url
              },
              alt
            },
            aboutImage2 {
              asset -> {
                _id,
                url
              },
              alt
            },
            pragraph1,
            pragraph2,
            pragraph3,
            pragraph4,
            pragraph5,
            clients,
            projects
        }`;

        client.fetch(query)
            .then((data) => {
                setAbout(data[0]);
                setIsLoading(false);
                fetchedClients = data[0]?.clients;
                fetchedProjects = data[0]?.projects;
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err);
                setIsLoading(false);
            });
    }, []);


    const components = {
        types: {
            space: ({ value }) => {
                // Render the space component
                return (
                    <div style={{ height: value.height }} className={styles.space} />
                );
            }
        },
    }




    // ____________________ COUNTING ____________________//

    // console.log(about.clients.length)

    let [clientCount, setClientCount] = useState(0);
    let [projectCount, setProjectCount] = useState(0);

    useEffect(() => {
        // Simulate counting animation on initial render
        const intervalId = setInterval(() => {
            if (clientCount <= fetchedClients) {
                setClientCount(clientCount++);
            }
            if (projectCount <= fetchedProjects) {
                setProjectCount(projectCount++);
            }
        }, 100); // Adjust interval for desired animation speed (in milliseconds)

        return () => clearInterval(intervalId); // Cleanup function to stop animation
    }, []);

    // ____________________ COUNTING ____________________//


    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>

            {about ? (
                <div className={styles.container}>
                    <div className={Head_master} >
                        <h1 className={styles.Scale}>About Us</h1>
                    </div>
                    <div className={styles.about_container}>
                        <div className={HeadClass}>
                            <h1>About Us</h1>
                        </div>
                        <div className={styles.About}>
                            <div className={styles.top}>

                                {about.aboutImage1 && about.aboutImage1.asset && (
                                    <div className={styles.image} >
                                        <img className={`${styles.img} ${styles.Scale}`} src={about.aboutImage1.asset.url} alt="" />
                                    </div>
                                )}

                                <div className={styles.texts}>
                                    {about.pragraph1 && (
                                        <div className={`${styles.text_section} ${styles.SLide}`}>
                                            <PortableText value={about.pragraph1} components={components} />
                                        </div>
                                    )}
                                    {about.pragraph2 && (
                                        <div className={`${styles.text_section} ${styles.SLide}`}>
                                            <PortableText value={about.pragraph2} components={components} />
                                        </div>
                                    )}

                                    {about.pragraph3 && (
                                        <div className={`${styles.text_section} ${styles.SLide}`}>
                                            <PortableText value={about.pragraph3} components={components} />
                                        </div>
                                    )}

                                    {about.pragraph4 && (
                                        <div className={`${styles.text_section} ${styles.SLide}`}>
                                            <PortableText value={about.pragraph4} components={components} />
                                        </div>

                                    )}
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.texts}>

                                    {about.pragraph5 && (
                                        <div className={`${styles.text_section} ${styles.SLide}`}>
                                            <PortableText value={about.pragraph5} components={components} />
                                        </div>
                                    )}

                                    {about.clients && about.projects && (
                                        <div className={`${styles.projects} ${styles.Scale}`}>
                                            <div className={styles.project}>
                                                <h2>{clientCount}+</h2>
                                                <small>Clients served</small>
                                            </div>
                                            <div className={styles.project}>
                                                <h2>{projectCount}+</h2>
                                                <small>Projects</small>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {about.aboutImage2 && about.aboutImage2.asset && (
                                    <div className={styles.image}>
                                        <img className={`${styles.img} ${styles.Scale}`} src={about.aboutImage2.asset.url} alt="" />
                                    </div>
                                )}

                            </div>
                            {/* <div className={styles.scope}>
                                <div className={styles.OurVission}>
                                    <div className={styles.contex}>
                                        <p>Hello vission</p>
                                        <small>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quia? Eveniet ea omnis non praesentium natus dolores, suscipit, molestiae vitae quod deserunt aliquam labore provident ipsum soluta corrupti nam qui?</small>
                                    </div>
                                </div>
                                <div className={styles.OurMission}>
                                    <div className={styles.contex}>
                                        <p>Hello Mission</p>
                                        <small>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quia? Eveniet ea omnis non praesentium natus dolores, suscipit, molestiae vitae quod deserunt aliquam labore provident ipsum soluta corrupti nam qui?</small>
                                    </div>
                                </div>
                                <div className={styles.OurStory}>
                                    <div className={styles.contex}>
                                        <p>Hello storry</p>
                                        <small>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quia? Eveniet ea omnis non praesentium natus dolores, suscipit, molestiae vitae quod deserunt aliquam labore provident ipsum soluta corrupti nam qui?</small>
                                    </div>
                                </div>
                            </div> */}

                            <Objectives />

                        </div>
                    </div>
                </div>
            ) : ''}

        </>
    )
}

export default About 