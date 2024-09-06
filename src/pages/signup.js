import AccountSignup from '@/components/AccountSignup'
import Footer from '@/components/Home/footer'
import Navbar from '@/components/Home/navbar'
import React from 'react'

const SignUp = () => {
  return (
    <div className="">
      <div className="mx-auto container">
        <Navbar/>
        <AccountSignup/>
      </div>
      <Footer/>
    </div>
  )
}

export default SignUp