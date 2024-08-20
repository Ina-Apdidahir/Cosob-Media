
import styles from './Testmonials.module.css'
import TestimonialSlider from './TestimonialSlider'



function Testmonials() {

    return (
        <div className={styles.container}>
            <div className={styles.customer_section}>
                <div className={styles.Head}>
                    <h1>TESTIMONIALS</h1>
                </div>
                    <TestimonialSlider/>
            </div>
        </div>
    )

}

export default Testmonials