
import { Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'


import client from '../../Sanity Client/SanityClient';
import styles from './Services.module.css'
import next from '../assets/web Images/next.png'



function ServiceSection() {

    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(location.pathname === '/'); // Initial state

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location]);

    const HeadClass = isHomePage ? styles.Head : `${styles.Head} ${styles.hide}`;
    const Head_master = isHomePage ? `${styles.Head_master} ${styles.hide}` : styles.Head_master;

   const [services, setServices] = useState([])
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

    useEffect(() => {
        const query = `*[ _type == "service" ] | order(_createdAt desc) {
            title,
            slug,
            description,
            coverImage {
              asset -> {
                _id,
                url
              },
              alt
            },
            serviceImages {
              asset -> {
                _id,
                url
              },
              alt
            },
            servicebody
        }`;

        client.fetch(query)
            .then((data) => {
                setServices(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err);
                setIsLoading(false);
            });
    }, []);


    /////////// ..... ___________   Handle scroll  Events of ____________  .... //////////////


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
            // console.log("Elements found:", elements.length);
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
    

    /////////// ..... ___________   Handle scroll   Events of ____________  .... //////////////


    if (isLoading) {
        return <div></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!services) {
        return <div>Service not found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={Head_master}>
                <h1>Services We Offer</h1>
            </div>
            <div className={styles.service_container}>
                <div className={HeadClass}>
                    <h1>Services We Offer</h1>
                </div>
                <div className={styles.serviceList}>

                    {services.map((service, index) => (
                        <Link key={index} to={`/details/${service.slug?.current}`}> 
                            <div className={styles.Service}>
                                <div className={styles.Image}>
                                    {service.coverImage && service.coverImage.asset &&(
                                        <img className={`${styles.img} ${styles.Scale}`} src={service.coverImage.asset.url} alt={service.title} />
                                    )}
                                    
                                </div>
                                <div className={`${styles.texts} ${styles.Scale}`}>
                                    <p>{service.title}</p>
                                    <div className={styles.Arrow}>
                                        <img src={next} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )

}


export default ServiceSection