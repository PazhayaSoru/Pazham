import React from 'react'
import Header from '../components/Header';
import HeroSection from '../components/HomeHeroSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
       <Header logged/>
       <HeroSection/>
       <Footer/>
    </>
  )
}

export default HomePage;