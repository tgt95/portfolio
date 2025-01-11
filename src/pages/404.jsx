import { Link } from 'react-router-dom'

import { Header } from '../components/layouts/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <section className='section section-404'>
        <div className='container content-wrapper'>
          <div className='content-text'>
            <div className='text-display-1 title'>404</div>
            <p className='m-b-8'>
              I couldn't find the page you were looking for. <br />
              Contact{' '}
              <a
                href='mailto:giatuantrinh@gmail.com'
                className='text-underline'
                style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--fg-main)' }}
              >
                Tuan
              </a>{' '}
              for help?{' '}
            </p>
            <Link to='/' className='btn btn-outline'>
              Return Home
            </Link>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  )
}
