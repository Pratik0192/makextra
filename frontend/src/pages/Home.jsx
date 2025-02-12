import React from 'react'
import Hero from '../components/Hero'
import KurtiCollection from '../components/KurtiCollection'
import AnarkaliCollection from '../components/AnarkaliCollection'
import BestSellers from '../components/BestSellers'

const Home = () => {
  return (
    <div>
      <Hero />
      <KurtiCollection />
      <AnarkaliCollection />
      <BestSellers />
    </div>
  )
}

export default Home