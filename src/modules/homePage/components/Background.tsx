import React, { ReactNode } from 'react'
import '../css/background.css'

export const Background = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='home-background'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {children}
    </>
  )
}
