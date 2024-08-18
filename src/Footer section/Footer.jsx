
import { Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';

import styles from './Footer.module.css'

import gmail from '../assets/web Images/gmail.png'
import adress from '../assets/web Images/location.png'
import phone from '../assets/web Images/phone.png'


function Footer() {


    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(location.pathname === '/'); // Initial state
    const [isabout, setIsabout] = useState(location.pathname === '/about'); // Initial state

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location]);
    useEffect(() => {
        setIsabout(location.pathname === '/contact');
    }, [location]);

    const Head_master = isabout ? styles.Head_master : `${styles.Head_master} ${styles.hide}`;

    const shorttitle = isHomePage ? styles.title : `${styles.title} ${styles.hide}`;
    const LongTXT = isHomePage ? `${styles.ContactTXT} ${styles.hide}` : styles.ContactTXT;
    const contact_box = isHomePage ? styles.contact : `${styles.contact_box} ${styles.contact}`;


    // ///////////////////  >>>>>>>>>>>>>>>>>>>>>>>>>>>>


    const form = useRef();

    const nameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const messageInputRef = useRef(null);

    const succmessagetRef = useRef(null);

    // const [visible , setVisible] = useState()

    useEffect(() => {
        const intervalId = setInterval(() => {

            succmessagetRef.current.style.opacity = 0
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_ij2kyp7', 'template_8deh6uo', form.current, {
                publicKey: 'jBw2ioCkAwiO2N4tZ',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    nameInputRef.current.value = '';
                    phoneInputRef.current.value = '';
                    emailInputRef.current.value = '';
                    messageInputRef.current.value = '';
                    succmessagetRef.current.style.opacity = 1
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    // /////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

     //_____________________  Scroll Animations ____________________________\\

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
            { threshold: 0.1 } // Adjust the threshold as needed
        );

        const elements = document.querySelectorAll(`.${styles.Scale}`);
        elements.forEach((el) => observer.observe(el));

        const LeftSlide = document.querySelectorAll(`.${styles.LeftSlide}`);
        LeftSlide.forEach((el) => observer.observe(el));

        const rightSlide = document.querySelectorAll(`.${styles.rightSlide}`);
        rightSlide.forEach((el) => observer.observe(el));


        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);


    //_____________________  Scroll Animations ____________________________\\



    return (
        <div className={styles.container}>
            <div className={Head_master}>
                <h1>Why Contact Us</h1>
            </div>
            <div className={contact_box}>
                <div className={styles.Footer_container}>

                    <div className={styles.address_box}>
                        <div className={LongTXT}>
                            <h1 className={styles.LeftSlide}>Let's chat about bringing your vision to life.</h1>
                            <p className={styles.LeftSlide}>
                                We're passionate about helping businesses like yours create a lasting impression.
                                Whether you need stunning visuals, engaging social media content,
                                or a brand identity that truly resonates with your audience, we're here to
                                collaborate andcraft a solution that exceeds your expectations.
                            </p>
                            <h1 className={styles.LeftSlide}>
                                Ready to get started?
                            </h1>
                            <p className={styles.LeftSlide}>
                                Fill out the form below and tell us a bit about your project.
                                We'll be in touch shortly to discuss your needs and how we can help
                                you achieve your goals.
                            </p>
                        </div>
                        <h2 className={` ${shorttitle} ${styles.LeftSlide}`}>
                            Need help with professional photography? Let's work together!
                        </h2>
                        <ul className={styles.LeftSlide}>
                            <li>
                                <img src={phone} alt="" />
                                <span>+252 123-090-4040</span>
                            </li>
                            <li>
                                <img src={gmail} alt="" />
                                <span>cosobcomms@gmail.com</span>

                            </li>
                            <li>
                                <img src={adress} alt="" />
                                <span> Hero Drawish, Galkaio, Mudug, Somalia</span>
                            </li>
                        </ul>

                    </div>

                    <div className={styles.Inputs_box}>
                        <div className={styles.box_r}>
                            <div className={styles.form_box}  >
                                <div className={styles.form_title}>
                                    <h2>Get in touch</h2>
                                </div>
                                <div className={styles.success} ref={succmessagetRef}>
                                    <p>Message Sent Succesfully</p>
                                </div>
                                <form ref={form} method="post"  onSubmit={handleSubmit}>
                                    <div className={styles.one_line}>
                                        <div className={styles.box_input}>
                                            <input ref={nameInputRef} type="text" name="user_name" className={`${styles.text} ${styles.LeftSlide}`} placeholder="Full Name.." required />
                                        </div>
                                        <div className={styles.box_input}>
                                            <input ref={phoneInputRef} type="tel" name="user_phone" className={`${styles.text} ${styles.LeftSlide}`} placeholder="your phone.." required />
                                        </div>
                                    </div>

                                    <div className={styles.box_input}>
                                        <input ref={emailInputRef} type="email" name="user_email" id="" className={`${styles.text} ${styles.LeftSlide}`} placeholder="your email.." required />
                                    </div>

                                    <div className={styles.message_input}>
                                        <label ></label>
                                        <textarea ref={messageInputRef} name="user_message" id="" className={`${styles.Text_Area} ${styles.LeftSlide}`} rows="10" placeholder="your Message.." required></textarea>
                                    </div>
                                    <button type="submit" className={` ${styles.btn_send} ${styles.Scale}`}>Send</button>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div >
    )

}

export default Footer