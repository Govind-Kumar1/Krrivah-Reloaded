import React from 'react'
import AboutHero from '../components/AboutComponents/AboutHero'
import OurRoots from '../components/AboutComponents/OurRoots'
import FoundersSection from '../components/AboutComponents/FoundersSection'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'

const About = () => {
  return (
    <>
    <Navbar/>
    <AboutHero/>
    <OurRoots/>
    <FoundersSection/>
    </>
  )
}

export default About