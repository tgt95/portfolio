import { Swiper, SwiperSlide } from 'swiper/react'

import { baseURL } from '../../../ultils/baseconfig'

import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination'

export function Testimonial({ data }) {
  const listItems = data.map((item, index) => {
    return (
      <SwiperSlide key={index} className='swiper-slide'>
        <i className='icon-quotes ri-double-quotes-l' style={{ color: 'var(--fg-decor)' }}></i>
        <div className='testimonials-description'>{item.message}</div>
        <div className='testimonials-author-content'>
          <div className='testimonials-author-content-left'>
            <img
              className='testimonials-author-avatar'
              src={item.avatar}
              // src={baseURL + item.avatar}
              alt={item.author}
            />
          </div>
          <div className='testimonials-author-content-right'>
            <div className='testimonials-author-name'>
              {item.author}
              <a href={item.linkedin}>
                <i className='ri-linkedin-box-fill'></i>
              </a>
            </div>
            <div className='testimonials-author-role'>{item.role}</div>
          </div>
        </div>
      </SwiperSlide>
    )
  })
  return (
    <section className='section section-testimonials has-divider'>
      <div className='container section-heading text-center'>
        <div className='section-title'>Hear the messages</div>
        <div className='section-description'>Things that keep my colleagues love working with me 🫶</div>
      </div>
      <div className='container'>
        <div className='swiper swiper-container col-lg-12 col-xl-6 px-0'>
          <div className='swiper-wrapper testimonials-content'>
            <Swiper
              mousewheel={true}
              keyboard={true}
              parallax={true}
              grabCursor={true}
              loop={true}
              speed={600}
              pagination={true}
              modules={[Pagination]}
              // pagination={{ el: ".swiper-pagination", clickable: true, dynamicBullets: true }}
            >
              {listItems}
            </Swiper>
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </div>
    </section>
  )
}
