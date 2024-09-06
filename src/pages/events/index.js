import Events from '@/components/events/Events'
import Navbar from '@/components/events/navbar'
import Footer from '@/components/Home/footer'
import React from 'react'

const AllEvents = () => {
  return (
    <div>
      <Navbar/>
        <Events/>
      <Footer/>
    </div>
  )
}

export default AllEvents