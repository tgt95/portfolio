import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { baseURL } from '../../ultils/baseconfig'

export default function Loader({
  description = 'Loading...',
  src = baseURL + 'assets/images/logo.svg',
  timeout = 1000
}) {
  const loaderRef = useRef(null) // Ref for the Loader

  useEffect(() => {
    const loader = loaderRef.current

    document.body.style.overflow = 'hidden'
    document.body.style.display = ''
    document.body.style.backgroundColor = ''

    setTimeout(() => {
      // Time to show loading - 1s
      document.body.style.overflow = ''
      loader.classList.add('move2Left', 'animate__animated')
      loader.addEventListener('animationend', () => loader.remove())
    }, timeout)
  }, [])

  const root = document.getElementById('root') || document.body

  return ReactDOM.createPortal(
    <div className='page-loader' ref={loaderRef}>
      <div className='loader-content'>
        <img className='logo-img' src={src} />
        <div className='page-loader-title mt-2'>{description}</div>
      </div>
    </div>,
    root
  )
}
