import { profileData, bannerData, workData, blogData, testimonialData } from '../../data/data'

import { Header } from '../../components/layouts/Header'
import { Footer } from '../../components/layouts/Footer'
import { Profile } from './sections/Profile'
import { Banner } from './sections/Banner'
import { Work } from './sections/Work'
import { Testimonial } from './sections/Testimonial'
import { Blog } from './sections/Blog'
import { Contact } from './sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <Banner title={bannerData.title} description={bannerData.description} />
      <Profile data={profileData} />
      <Work data={workData} />
      <Blog data={blogData} />
      <Testimonial data={testimonialData} />
      <Contact resumeFile='./product-designer-trinh-gia-tuan.pdf' />
      <Footer />
    </>
  )
}
