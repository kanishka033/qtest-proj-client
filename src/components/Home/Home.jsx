import React from 'react'
import Header from './header/Header'
import IntroSection from './IntroSection/IntroSection'
import ReviewSection from './ReviewSection/ReviewSection'
import Footer from './Footer/Footer'
import { useSelector } from 'react-redux';
import Dashboard from '../Dashboard'

const Home = () => {
  const login = useSelector((state)=> state.auth.login);

  if(login) return (
    <>
      <Header />
      <Dashboard />
      <Footer />
    </>
  )
  else return (
  <>
    <Header />
    <IntroSection />
    <ReviewSection />
    <Footer />
  </>  
  )
}

export default Home