import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'

export function Lightbox({ caption, children, isOpen, onClose }) {
  // The state isOpen inherit from the parent component passing down
  const [isVisible, setIsVisible] = useState(isOpen)

  const handleClose = () => {
    setIsVisible(false) // Trigger fade-out animation
    setTimeout(() => {
      onClose() // Close the lightbox after animation ends
    }, 300) // Match this to the `transition.duration`
  }

  if (!isOpen && !isVisible) return null

  const modalRoot = document.getElementById('modal-root') || document.body

  return ReactDOM.createPortal(
    <motion.div
      key='lightbox'
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className='lightbox-backdrop'
    >
      <div className='lightbox-wrapper' onClick={handleClose}>
        <motion.div
          className='lightbox-content'
          onClick={(e) => e.stopPropagation()} // Prevent close on inner clicks
          initial={{ scale: 0.9 }}
          animate={{ scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className='lightbox-toolbar'>
            <button className='btn btn-default btn-just-icon' onClick={handleClose}>
              <i className='ri-close-line'></i>
            </button>
          </div>
          <div className='lightbox-body'>{children}</div>
          <div className='lightbox-caption'>{caption}</div>
        </motion.div>
      </div>
    </motion.div>,
    modalRoot
  )
}
