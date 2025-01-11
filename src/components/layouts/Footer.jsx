import { dataNavigationSocials, footerData } from '../../data/data'
import Typewriter from 'typewriter-effect'

export function Footer() {
  const { title } = footerData
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 author-content'>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(title.text_1)
                  .deleteChars(title.text_1.length - 3)
                  .typeString(title.text_2)
                  .deleteChars(title.text_2.length - 3)
                  .pauseFor(100)
                  .start()
              }}
              options={{
                loop: true,
                delay: 75,
                cursor: '',
                deleteSpeed: 'fast'
              }}
            />
          </div>
          <div className='col-md-6'>
            <ul className='social-list'>
              {dataNavigationSocials.map((item, index) => (
                <li key={index}>
                  <a className='btn btn-just-icon btn-ghost-brand' href={item.href} target='_blank' rel='noreferrer'>
                    <i className={`ri-${item.icon}-fill`}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
