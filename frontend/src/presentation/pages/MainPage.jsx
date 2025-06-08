import React from 'react'
import Header from '../components/Header'
import MainHeroSection from "../components/MainHeroSection.jsx";
const MainPage = () => {
  return (
    <div>
      <Header logged={true}/>
      <MainHeroSection/>
    </div>
  )
}

export default MainPage;