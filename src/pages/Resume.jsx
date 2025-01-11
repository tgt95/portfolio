import React, { useState, useEffect, useRef } from 'react'

import { Header } from '../components/layouts/Header'
import { Footer } from '../components/layouts/Footer'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFlip, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-flip'

export default function Resume({ data, openToWork }) {
  const [pageMarginTop, setPageMarginTop] = useState(0)

  const swiperRef = useRef(null)

  const handleImageClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext() // Navigate to the next slide
    }
  }

  useEffect(() => {
    const isMobile = document.body.classList.contains('is-mobile')
    isMobile
      ? setPageMarginTop('var(--space-xl)')
      : setPageMarginTop(document.querySelector('.header').getBoundingClientRect().height + 24 + 'px')
  }, [])

  const listItems = data.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <img
          src={item}
          alt='Gia Tuan'
          style={{
            width: '100%',
            height: '100%'
          }}
          onClick={handleImageClick}
        />
      </SwiperSlide>
    )
  })

  return (
    <>
      <Header />
      <section className='section section-personal-info' style={{ marginTop: `${pageMarginTop}` }}>
        <div className='container'>
          <div className='section-personal-info-container'>
            <div className='section-personal-info-header'>
              <div className='section-personal-info-header-left'>
                <div className='avatar swiper-container'>
                  <Swiper
                    style={{
                      height: '100%'
                    }}
                    modules={[EffectFlip, Autoplay]} // Add Flip to the modules array
                    effect={'flip'} // Set the effect to "flip"
                    speed={1000}
                    flipEffect={{
                      slideShadows: false // Disable shadow effect
                    }}
                    loop={true}
                    autoplay={{
                      delay: 2000
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // Store the Swiper instance
                  >
                    {listItems}
                  </Swiper>
                  {openToWork && <span className='badge badge-success open-to-work'>Open to work</span>}
                </div>
              </div>
              <div className='section-personal-info-header-right'>
                <div className='m-b-5'>
                  <div className='name'>Tuan (Cody) Trinh</div>
                  <div className='role'>Senior Product Designer</div>
                </div>
                <div className='bottom'>
                  <div className='description'>
                    I help the business owner by balancing the business value &amp; the user needs. Create value for the
                    product by Problem Solving, Critical Thinking, Data Metric, and Interaction Design.
                  </div>
                  <div className='actions'>
                    <a className='btn btn-primary' href='product-designer-trinh-gia-tuan.pdf' download=''>
                      <i className='ri-download-2-fill'></i> Download Resume
                    </a>
                    <a className='btn btn-outline' href='mailto:giatuantrinh@gmail.com'>
                      <i className='ri-mail-send-line'></i> Contact me
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='divider'></div>
            <div className='section-personal-info-body'>
              <div className='row'>
                <div className='section-personal-info-body-experience col-lg-8 col-md-7'>
                  <div className='group-title'>Experience</div>
                  <div className='timeline-content'>
                    <div className='milestone'>
                      <div className='milestone-header'>
                        <div className='milestone-header-left'>
                          <img className='logo' src='assets/images/logo/be.svg' />
                        </div>
                        <div className='milestone-header-right'>
                          <div className='job-title'>
                            Senior Product Designer <span>•</span> <span className='company-name'>beGroup</span>
                          </div>
                          <div className='date-range'>12/2022 - Present</div>
                        </div>
                      </div>
                      <ul className='description'>
                        <li className='text-success'>
                          Achievement: Food GMV streak (3.5x ↑), reduce Cancel trip rate of Driver
                        </li>
                        <li>
                          In charge of Food delivery service in beGroup ecosystem (Consumer, Merchant) from end to end
                          to level up the experience.
                        </li>
                        <li>
                          Conducted UX research by using Usability Evaluation (Heuristics), and Competitive Analysis to
                          find a cost-effective solution.
                        </li>
                        <li>Contributed and maintained the Design System, Toolkit, and Process.</li>
                      </ul>
                    </div>
                    <div className='milestone'>
                      <div className='milestone-header'>
                        <div className='milestone-header-left'>
                          <img className='logo' src='assets/images/logo/whydah.svg' />
                        </div>
                        <div className='milestone-header-right'>
                          <div className='job-title'>
                            Senior Product Designer <span>•</span> <span className='company-name'>WhyDah</span>
                          </div>
                          <div className='date-range'>07/2022 - 11/2022</div>
                        </div>
                      </div>
                      <ul className='description'>
                        <li>
                          Design the internal mobile app that enhances employee performance (Check-in/Check-out, Event,
                          Rewards system,...).
                        </li>
                        <li>Create a design system to maintain multiple products.</li>
                      </ul>
                    </div>
                    <div className='milestone'>
                      <div className='milestone-header'>
                        <div className='milestone-header-left'>
                          <img className='logo' src='assets/images/logo/momo.svg' />
                        </div>
                        <div className='milestone-header-right'>
                          <div className='job-title'>
                            Senior Product Designer <span>•</span> <span className='company-name'>MoMo</span>
                          </div>
                          <div className='date-range'>08/2021 - 07/2022</div>
                        </div>
                      </div>
                      <ul className='description'>
                        <li className='text-success'>
                          A key member of the FAST 2022 project: Improved payment speed of Pay QR feature
                        </li>
                        <li>
                          A solo designer of the AppX cell team handles all experiences in the MoMo application (Home,
                          Transaction detail,... ).
                        </li>
                        <li>Mentor other Junior designers to perform well their work</li>
                      </ul>
                    </div>
                    <div className='milestone milestone-start'>
                      <div className='milestone-header'>
                        <div className='milestone-header-left'>
                          <img className='logo' src='assets/images/logo/bigin.svg' />
                        </div>
                        <div className='milestone-header-right'>
                          <div className='job-title'>
                            Senior UX/UI Designer <span>•</span> <span className='company-name'>BigIn</span>
                          </div>
                          <div className='date-range'>2020 - 07/2021</div>
                        </div>
                      </div>
                      <ul className='description'>
                        <li>
                          Design multiple products across multiple platforms (Mobile/Web application, Portal, Landing
                          page): Travel, Food, Relocation.
                        </li>
                        <li>Work with team to build the design system to maintain multiple products of the company.</li>
                        <li>Promote to Lead Design Team (managed 2 members).</li>
                      </ul>
                    </div>
                    <div className='milestone milestone-end'>
                      <div className='milestone-header'>
                        <div className='milestone-header-left'>
                          <div className='logo'>
                            <div className='dot'></div>
                          </div>
                        </div>
                        <div className='milestone-header-right'>
                          <div className='job-title'>
                            UX/UI Designer <span>•</span> <span className='company-name'>BigIn</span>
                          </div>
                          <div className='date-range'>2017 - 2020</div>
                        </div>
                      </div>
                      <ul className='description'>
                        <li>Design Back Office System for trading, exchange Crypto.</li>
                        <li>
                          Provide the design solution for the leading industry brands: Ông Bầu Coffee, CitiGym, Nutifood
                          sub-brands (Ayaka diaper, PariMilk), 007Flower.
                        </li>
                      </ul>
                    </div>
                    <div className='divider-dashed'></div>
                    <div className='milestone'>
                      <div className='milestone-header'>
                        <div className='milestone-header-right'>
                          <div className='job-title'>Personal Project</div>
                        </div>
                      </div>
                      <ul className='description' style={{ paddingLeft: 'var(--space-sm)' }}>
                        <li>
                          Color Range Picker:{' '}
                          <a href='https://tgt95.github.io/color-generator/' _blank=''>
                            {' '}
                            https://tgt95.github.io/color-generator/
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-5'>
                  <div className='section-personal-info-body-profile'>
                    <div className='group-title'>Profile</div>
                    <div className='profile-content'>
                      <ul>
                        <li>
                          <span className='text-wrapper'>
                            <i className='icon ri-user-5-line'></i>
                            <div className='value'>Trình Gia Tuấn </div>
                            <i style={{ color: 'var(--fg-subtlest)' }}>(he/him)</i>
                          </span>
                        </li>
                        <li>
                          <span className='text-wrapper'>
                            <i className='icon ri-cake-2-line'></i>
                            <div className='value'>11th October, 1995</div>
                            <i style={{ color: 'var(--fg-subtlest)' }}>
                              (age&nbsp;<script>document.write((new Date().getFullYear()) -1995)</script>30)
                            </i>
                          </span>
                        </li>
                        <li>
                          <span className='text-wrapper'>
                            <i className='icon ri-mail-line'></i>
                            <div className='value'>giatuantrinh@gmail.com</div>
                          </span>
                        </li>
                        <li>
                          <span className='text-wrapper'>
                            <i className='icon ri-map-pin-2-line'></i>
                            <div className='value'>District 11, Ho Chi Minh City</div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='divider'></div>
                  <div className='section-personal-info-body-education'>
                    <div className='group-title'>Education</div>
                    <div className='timeline-content'>
                      <div className='milestone'>
                        <div className='milestone-header'>
                          <div className='milestone-header-right'>
                            <div className='job-title'>Bachelor Degree of Apply Information</div>
                            <div className='date-range'>2013 - 2016</div>
                          </div>
                        </div>
                        <ul className='description' style={{ paddingLeft: 'var(--space-sm)' }}>
                          <li>Ho Chi Minh City University of Natural Resources And Environment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='divider'></div>
                  <div className='section-personal-info-body-image'>
                    <img src='assets/images/personal-1.png' style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
