import React, { useEffect } from 'react'
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/common/Loader'
import Resume from './pages/Resume'
import NotFound from './pages/404'

import { mobileResponsive, baseURL } from './ultils/baseconfig'
import { fetchData } from './ultils/api'

// import 'bootstrap/dist/css/bootstrap-reboot.css'
// import 'bootstrap/dist/css/bootstrap-grid.css'

import './assets/styles/style.scss'

// const baseUrl = process.env.REACT_APP_BASE_URL || '/'
// const baseUrl = process.env.REACT_APP_BASE_URL

const App = () => {
  useEffect(() => {
    mobileResponsive()
  }, []) // Run only after the first render

  // console.log('process.env.REACT_APP_BASE_URL: ', process.env.REACT_APP_BASE_URL + )

  // const data = fetchData('df2e5675f00bc58b57ca')
  // console.log(data + ' from App.jsx')
  // console.log(data)

  return (
    <div className='App'>
      <Loader />
      <BrowserRouter basename={baseURL}>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/resume'
            element={
              <Resume
                data={['./assets/images/avatar.png', './assets/images/avatar-illustraion.svg']}
                openToWork={true}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
