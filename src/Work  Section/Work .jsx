
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import styles from './Work.module.css'

import client from '../../Sanity Client/SanityClient';

function Work() {

    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(location.pathname === '/'); // Initial state

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location]);




   //________________________   Handle scroll   Events of ____________________________\\


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
            console.log("Elements found:", elements.length);
            elements.forEach((el) => observer.observe(el));
        };
    
        observeElements(); // Initial run
        const observerMutation = new MutationObserver(observeElements);
        observerMutation.observe(document.body, { childList: true, subtree: true });
    
        return () => {
            observer.disconnect();
            observerMutation.disconnect();
        };
    }, []);

    //________________________   Handle scroll   Events of ____________________________\\




    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const query = `*[ _type == "work" ] | order(_createdAt desc) {
            client,
            slug,
            job,
            jobType,
            jobImage {
              asset -> {
                _id,
                url
              },
              alt
            },
            description
        }`;

        client.fetch(query)
            .then((data) => {
                setWorks(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err);
                setIsLoading(false);
            });
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
    };


    const filteredPosts = selectedCategory === 'All'
        ? works
        : works.filter(work =>
            Array.isArray(work.jobType) && work.jobType.includes(selectedCategory)
        );

    // console.log('Filtered Posts:', filteredPosts);

    const First6 = filteredPosts.slice(0, 6)
    const Allworks = filteredPosts

    return (
        <div className={styles.container}>
            <div className={styles.Work_section}>
                <div className={styles.works_Continer}>
                    <div className={styles.WorkHead}>
                        <h1>Our Working Process</h1>
                    </div>
                    <div className={styles.Buttons}>
                        <div className={styles.options}>
                            <select className={styles.selection} value={selectedCategory} onChange={handleOptionChange}>
                                <option value="All">All</option>
                                <option value="Branding">Branding</option>
                                <option value="Photography">Photography</option>
                                <option value="Videography"> Videography </option>
                                <option value="Events">Events</option>
                                <option value="Media Management">Media Management</option>
                            </select>
                        </div>
                        <div className={styles.workNavigations}>
                            <div className={styles.buttons}>
                                <button onClick={() => handleCategoryClick('All')}>All</button>
                                <button onClick={() => handleCategoryClick('Branding')}>Branding</button>
                                <button onClick={() => handleCategoryClick('Photography')}>Photography</button>
                                <button onClick={() => handleCategoryClick('Videography')}>Videography</button>
                                <button onClick={() => handleCategoryClick('Media Management')}>Media Management</button>
                                <button onClick={() => handleCategoryClick('Events')}>Events</button>
                            </div>
                        </div>
                    </div>

                    {isHomePage ? (
                        <div className={styles.works} >
                            {First6 && First6.length > 0 && (
                                First6.map((work, index) => (
                                    <div className={styles.work} key={index}>
                                        {work.jobImage && work.jobImage.asset && (
                                            <div className={styles.work_img}>
                                                <img className={styles.Scale} src={work.jobImage.asset.url} alt="" />
                                            </div>
                                        )}
                                        <div className={`${styles.work_Txts} ${styles.Scale}`}>
                                            {work.client && (
                                                <h2>{work.client}</h2>
                                            )}
                                            {work.jobType && (
                                                <p>{work.job}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>) : (<div className={styles.works} >
                            {Allworks && Allworks.length > 0 && (
                                Allworks.map((work, index) => (
                                    <div className={styles.work} key={index}>
                                        {work.jobImage && work.jobImage.asset && (
                                            <div className={styles.work_img}>
                                                <img className={styles.Scale} src={work.jobImage.asset.url} alt="" />
                                            </div>
                                        )}
                                        <div className={`${styles.work_Txts} ${styles.Scale}`}>
                                            {work.client && (
                                                <h2>{work.client}</h2>
                                            )}
                                            {work.jobType && (
                                                <p>{work.job}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>)
                    }
                </div>
            </div>
        </div>
    )

}

export default Work