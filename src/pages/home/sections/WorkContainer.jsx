import { GalleryItem } from './WorkItem'
import { baseURL } from '../../../ultils/baseconfig'

import { AnimatePresence, motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'

export function GalleryContainer({ index, projects, viewMode }) {
  let listItems
  switch (viewMode) {
    case 'grid':
      listItems = projects.map((item, index) => {
        return (
          <GalleryItem
            className='col-md-4'
            key={index}
            id={index}
            title={item.title}
            imgLargeURL={item.imgLargeURL}
            imgURL={item.imgURL}
            // imgLargeURL={baseURL + item.imgLargeURL}
            // imgURL={baseURL + item.imgURL}
            guideText={item.guideText}
            featured={item.featured}
            website={item.website}
            index={item.index}
            external={item.external}
            externalURL={item.externalURL}
            isPublic={item.isPublic}
            viewMode={viewMode}
          />
        )
      })
      break

    case 'list':
      listItems = projects.map((item, index) => {
        return (
          <SwiperSlide key={index} className='item'>
            <GalleryItem
              key={index}
              title={item.title}
              imgLargeURL={item.imgLargeURL}
              imgURL={item.imgURL}
              guideText={item.guideText}
              featured={item.featured}
              website={item.website}
              index={item.index}
              external={item.external}
              externalURL={item.externalURL}
              isPublic={item.isPublic}
              viewMode={viewMode}
            />
          </SwiperSlide>
        )
      })
      break
  }

  return (
    <div data-view={viewMode} className={viewMode === 'grid' ? 'swiper-container container' : ''} key={index}>
      <div className={viewMode === 'grid' ? 'slide-wrapper row' : 'slide-wrapper'}>
        {viewMode === 'list' ? (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Swiper
              key={index}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesOffsetBefore={document.querySelector('.section-work .section-title').getBoundingClientRect().left}
              slidesOffsetAfter={document.querySelector('.section-work .section-title').getBoundingClientRect().left}
              spaceBetween={32}
              slidesPerView={'auto'}
              // mousewheel={true}
              navigation={{
                nextEl: '.slide-button-next',
                prevEl: '.slide-button-prev'
              }}
              breakpoints={{
                576: {
                  spaceBetween: 32
                },
                320: {
                  spaceBetween: 16
                }
              }}
            >
              {listItems}
            </Swiper>
          </motion.div>
        ) : (
          listItems
        )}
      </div>
      {viewMode === 'list' && (
        <div className='container'>
          <div className='swiper-controls'>
            <button className='btn btn-just-icon btn-default slide-button-prev m-r-3'>
              <i className='ri-arrow-left-s-line'></i>
            </button>
            <button className='btn btn-just-icon btn-default slide-button-next'>
              <i className='ri-arrow-right-s-line'></i>
            </button>
            <div className='swiper-pagination'></div>
          </div>
        </div>
      )}
    </div>
  )
}
