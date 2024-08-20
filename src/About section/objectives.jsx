
import React, { useState, useEffect } from 'react'

import client from '../../Sanity Client/SanityClient';
import { urlFor } from '../../Sanity Client/SanityClient';
import { PortableText } from '@portabletext/react';

import styles from './objectives.module.css'

function Objectives() {

    
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


    const [objectives, setObjectives] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const query = `*[ _type == "objectives" ] {
            title,
            description
        }`;

        client.fetch(query)
            .then((data) => {
                setObjectives(data);
                setIsLoading(false);
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
            },
            image: ({ value }) => {
                const imageUrl = urlFor(value.asset).url(); // Generate the URL
                return (
                    <img
                        src={imageUrl}
                        alt={value.alt || 'Image'}
                        className={styles.Image}
                    />
                );
            },
        },
    };


    return (
        <>
            {objectives && (
                <div className={styles.scope}>
                    {objectives.map((objective, index) => (
                        <div key={index} className={styles.OurVission}>
                            <div className={styles.contex}>
                                <div className={styles.title}>
                                    <p className={styles.Scale}>{objective.title}</p>
                                </div>
                                <PortableText value={objective.description} components={components} />
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </>
    )
}

export default Objectives