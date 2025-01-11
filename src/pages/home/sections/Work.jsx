import React, { useState, forwardRef } from 'react'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '../../../components/common/button/Button'
import { GalleryContainer } from './WorkContainer'

let CustomTab = forwardRef(function (props, ref) {
  return <li ref={ref} {...props}></li>
})

let CustomTabList = forwardRef(function (props, ref) {
  return <ul ref={ref} {...props}></ul>
})

export function Work({ data }) {
  // State to manage the active tab
  // If data[0] is undefined (e.g., when data is an empty array), the expression will safely return undefined instead of throwing an error.
  // If the result is a falsy value (like undefined or null), the expression evaluates to the value after || (in this case, "").
  const [activeTab, setActiveTab] = useState(data[0]?.type || '')
  const [view, setView] = useState('grid') // Default view is grid

  function handleClickSwitchingView(e) {
    const selectedView = e.currentTarget.getAttribute('action')
    setView(selectedView) // Update view state based on button clicked
  }

  // Handle tab click to set the active tab
  function handleClickTab(type) {
    setActiveTab(type)
  }

  // Only filter data is visible for showing
  const filterDataIsPublic = data.filter((item) => item.visible === true)
  const listItems = filterDataIsPublic.map((item, index) => {
    return (
      <TabPanel key={index}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GalleryContainer
            key={index}
            index={index}
            projects={item.data}
            viewMode={view}
            // activeState={{ display: activeTab === item.type ? "block" : "none" }} // Show/Hide based on active tab
          />
        </motion.div>
      </TabPanel>
    )
  })

  return (
    <section className='section section-work'>
      <TabGroup className={view === 'list' ? 'm-b-10' : ''}>
        <div className='container'>
          <div className='section-heading'>
            <div className='section-title'>Work</div>
          </div>

          <div className='navigation-tabs'>
            <TabList as={CustomTabList}>
              {filterDataIsPublic.map((item, index) => (
                <Tab key={index} as={CustomTab} className={activeTab === item.type ? 'active' : ''}>
                  <Button type='button' className={null} onClick={() => handleClickTab(item.type)}>
                    {item.name}
                  </Button>
                </Tab>
              ))}
            </TabList>

            <div className='switch-view'>
              <Button
                className={`btn-just-icon ${view === 'grid' ? 'active' : ''}`}
                action='grid'
                onClick={handleClickSwitchingView}
              >
                <i className='ri-function-line'></i>
              </Button>
              <Button
                className={`btn-just-icon ${view === 'list' ? 'active' : ''}`}
                action='list'
                onClick={handleClickSwitchingView}
              >
                <i className='ri-list-check-2'></i>
              </Button>
            </div>
          </div>
        </div>
        <TabPanels>
          <AnimatePresence>{listItems}</AnimatePresence>
        </TabPanels>
      </TabGroup>
    </section>
  )
}
