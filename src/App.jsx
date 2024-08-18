
import LandingPage from './Landing Page/LandingPage.jsx'
import AboutLanding from './About section/AboutLanding.jsx'
import ServiceLanding from './Service Section/ServiceLanding.jsx';
import WorkLanding from './Work  Section/WorkLanding.jsx'
import Foter_Landing from './Footer section/Footer_Langing.jsx'
import Details from './Service Section/Details.jsx'
import Testmonials from './Testimonials Section/Testimonials.jsx';
import './App.css'


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
      <BrowserRouter basename="/Cosob-Media">
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutLanding />} />
          <Route path="/service" element={<ServiceLanding />} />
          <Route path="/details/:slug" element={<Details />} /> 
          <Route path="/work" element={<WorkLanding />} />
          <Route path="/contact" element={<Foter_Landing />} /> 
          <Route path="/testmonials" element={<Testmonials />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App




{/* <Router basename="/NewCosob">
<Routes>
<Route path="/" element={<LandingPage />} />
</Routes>
</Router> */}


  //  
  //   
  //   
  //   

  //   
  //   
