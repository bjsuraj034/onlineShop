import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'
import Newsletters from '../components/Newsletters'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
    <Hero/>
    <LatestCollection/>
    <Bestseller/>
    <OurPolicy/>
    <Newsletters/>
    </>
  )
}

export default Home