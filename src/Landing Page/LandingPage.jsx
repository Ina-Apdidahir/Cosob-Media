
import HeadSection from '../Header Section/Header.jsx'
import Homesection from '../Home section/Home.jsx'
import About from '../About section/About.jsx'
import ServiceSection from '../Service Section/Services.jsx'
import Work from '../Work  Section/Work .jsx'
import Testmonials from '../Testimonials Section/Testimonials.jsx'


import Footer from '../Footer section/Footer.jsx'
import Bottom_Foter from '../Footer section/Bottom_Foter.jsx'

function LandingPage(){
    return(
        <>
        <HeadSection />
        <Homesection />
        <About />
        <ServiceSection />
        <Work />
        <Testmonials /> 
        <Footer />
        <Bottom_Foter />
        </>
    )
}

export default LandingPage