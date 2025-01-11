import React, { useRef, useState, useEffect, forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

import { Button } from '../../../components/common/Button/Button'
// import { Lightbox } from '../../../components/common/Lightbox/Lightbox'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { getImageSize } from '../../../ultils/helpers'

export function GalleryItem({
  title,
  imgURL,
  imgLargeURL,
  website,
  index,
  external,
  externalURL,
  guideText,
  isPublic,
  id,
  viewMode
}) {
  const [imgSize, setImgSize] = useState({})
  const itemThumbnailRef = useRef(null) // Ref for the Item thumbnail
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [inputPasscode, setInputPasscode] = useState('')
  const [error, setError] = useState('')
  const [targetLink, setTargetLink] = useState('')

  let CustomDialogTitle = forwardRef(function (props, ref) {
    return <div className='dialog-title' ref={ref} {...props}></div>
  })

  const handleCardClick = (e, isPublic, link) => {
    if (isPublic) {
      console.log('isPublic: ', isPublic)
      window.open(link, '_blank')
    } else {
      e.preventDefault()
      setIsDialogOpen(true)
      // console.log("isPublic: ", isPublic);
    }
  }

  useEffect(() => {
    // Get the image size
    getImageSize(imgLargeURL)
      .then(({ width, height }) => {
        setImgSize({
          width: width,
          height: height
        })
      })
      .catch((error) => {
        console.error(error.message)
      })

    // Initialize the lightbox
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#pswp-' + id,
      children: '.item-thumbnail a',
      // initialZoomLevel: 'fill',
      // secondaryZoomLevel: 1.5,
      // maxZoomLevel: 1,
      allowPanToNext: true,
      wheelToZoom: true,
      // getThumbBoundsFn: (index) => {
      //   // get window scroll Y
      //   var pageYScroll = window.scrollY || document.documentElement.scrollTop
      //   // optionally get horizontal scroll

      //   // get position of element relative to viewport
      //   var rect = itemThumbnailRef.current.getBoundingClientRect()

      //   // w = width
      //   return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
      // },
      pswpModule: () => import('photoswipe')
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
      lightbox = null
    }
  }, [])

  return (
    <>
      {external ? (
        <div className={viewMode === 'grid' ? 'item col-lg-4 col-md-6' : 'item'}>
          <div className='item-thumbnail' ref={itemThumbnailRef}>
            <img src={imgURL} alt={title} />
            <a
              className='overlay-content'
              href={externalURL}
              target='_blank'
              rel='nofollow'
              onClick={(e) => {
                handleCardClick(e, isPublic, externalURL)
              }}
              data-status={isPublic.toString()}
            >
              {!isPublic && (
                <span className='status-badge badge badge-warning'>
                  <i className='ri-lock-line'></i>
                  Private
                </span>
              )}
              <div className='text-center'>
                <i className='icon ri-external-link-line'></i>
                <div className='text'>{guideText}</div>
              </div>
            </a>
          </div>
          <div className='title'>{title}</div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'item col-lg-4 col-md-6' : 'item'} id={'pswp-' + id}>
          <div className='item-thumbnail' ref={itemThumbnailRef}>
            <img src={imgURL} alt={title} />
            <a
              className='overlay-content'
              href={imgLargeURL}
              data-pswp-width={imgSize.width}
              data-pswp-height={imgSize.height}
              data-status={isPublic.toString()}
            >
              {!isPublic && (
                <span className='status-badge badge badge-warning'>
                  <i className='ri-lock-line'></i>
                  Private
                </span>
              )}
              <div className='text-center'>
                <i className='icon ri-zoom-in-line'></i>
                <div className='text'>{guideText}</div>
              </div>
            </a>
          </div>
          <div className='title'>{title}</div>
          <div className='url-link'>
            <a href={website} target='_blank' rel='nofollow'>
              {website}
            </a>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isDialogOpen && (
          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onClick={(e) => console.log(e)}
            className='dialog'
          >
            <DialogBackdrop
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='dialog-backdrop'
            />

            <div className='dialog-wrapper'>
              <DialogPanel
                className='dialog-panel'
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className='dialog-header'>
                  <DialogTitle as={CustomDialogTitle}>Deactivate account</DialogTitle>
                  <Button className='btn-outline btn-just-icon' onClick={() => setIsDialogOpen(false)}>
                    <i className='ri-close-line'></i>
                  </Button>
                </div>
                <div className='dialog-body'>
                  Are you sure you want to deactivate your account? All of your data will be permanently removed. This
                  action cannot be undone.
                </div>
                <div className='dialog-footer'>
                  <Button className='btn-outline' onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className='btn-primary' onClick={() => setIsDialogOpen(false)}>
                    Submit
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
