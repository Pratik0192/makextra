import React from 'react'
import Hero from '../components/Hero'
import KurtiCollection from '../components/KurtiCollection'
import AnarkaliCollection from '../components/AnarkaliCollection'
import BestSellers from '../components/BestSellers'
import CelebsInMake from '../components/CelebsInMake'

const Home = () => {
  return (
    <div>
      <Hero />
      <KurtiCollection />
      <AnarkaliCollection />
      <BestSellers />
      <CelebsInMake />
    </div>
  )
}

export default Home