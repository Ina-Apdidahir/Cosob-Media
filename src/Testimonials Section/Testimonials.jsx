
import styles from './Testmonials.module.css'
import TestimonialSlider from './TestimonialSlider'

const data = [
    {
        author: "Geelle Bashir",
        website: "geellebashie.com",
        content: " I can't thank Cosob media works enough for transforming our brand identity. From the initial consultation to the final design, their team demonstrated a deep understanding of our vision and business goals. The new branding materials have given our company a fresh and professional look that has already attracted new clients. Their creativity, professionalism, and attention to detail are unmatched. Highly recommended!",
    },
    {
        author: " Helth care NGO ",
        website: "Médecins Sans Fortinéres",
        content: " Working with Cosob media works for our corporate video and photography needs was an absolute pleasure. Their team captured the essence of our company perfectly, delivering high-quality videos and photos that exceeded our expectations. The final products were not only visually stunning but also conveyed our brand message powerfully. The entire process was seamless, and their commitment to excellence truly sets them apart",
    },
    {
        author: "Political Association",
        website: "Mideeye Political Association",
        content: " Since partnering with Cosob media works  for our social media management, we've seen a significant increase in our online engagement and follower growth. Their team has a keen eye for content creation and a strategic approach to social media marketing that resonates with our audience. They consistently provide insightful analytics and suggestions to keep our online presence fresh and impactful. Their dedication and expertise have been instrumental in boosting our brand's visibility and credibility online",
    },
    {
        author: "Dookh press",
        website: "Somali Camel fate",
        content: " Planning an event can be incredibly stressful,  Cosob media works made it an enjoyable experience. They took care of every detail, from venue selection to on-the-day coordination, ensuring our event was a huge success. Their expertise and creativity shone through every aspect of the planning process. Our guests were impressed, and we received numerous compliments on how well-organized and memorable the event was. We couldn't have done it without them!",
    }
]

function Testmonials() {

    return (
        <div className={styles.container}>
            <div className={styles.customer_section}>
                <div className={styles.Head}>
                    <h1>TESTIMONIALS</h1>
                </div>
                    <TestimonialSlider reviews={data}/>
            </div>
        </div>
    )

}

export default Testmonials