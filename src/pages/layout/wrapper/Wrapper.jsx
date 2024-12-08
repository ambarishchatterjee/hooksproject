import React from 'react'
import Header from '../header/Header'

export default function Wrapper({userlogin,children}) {
  return (
    <>
    <Header userlogin = {userlogin} />
   {/* { console.log(userlogin)} */}
    
      {children}
    </>
  )
}
