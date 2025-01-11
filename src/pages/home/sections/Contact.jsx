import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { mediaBreakpoint, spacer, getHeight, getWidth } from '../../../ultils/helpers'

import IllustrationShapeWave1 from '../../../assets/images/SVG/shape-wave-1.svg?react'
import IllustrationShapeWave2 from '../../../assets/images/SVG/shape-wave-2.svg?react'
import IllusTree1 from '../../../assets/images/SVG/tree-1.svg?react'
import IllusTree2 from '../../../assets/images/SVG/tree-2.svg?react'
import IllusHuman2 from '../../../assets/images/SVG/human_3.svg?react'
// import ContactIllustration from './ContactIllustration'

export function Contact({ resumeFile }) {
  const svgRef = useRef(null) // Ref for the SVG
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const background = svgRef.current
    const svg = svgRef.current.children[0]

    if (!svg || !background) return

    // Table: >= md: 768 and < lg: 992px
    if (windowWidth >= mediaBreakpoint.md && windowWidth < mediaBreakpoint.lg) {
      svg.setAttribute('viewBox', `0 0 415 ${430}`)
    }
  }, []) // Run only after the first render

  return (
    <section className='section section-contact'>
      <IllustrationShapeWave1 className='shape-wave-1' />
      <IllustrationShapeWave2 className='shape-wave-2' />
      <IllusTree1 className='shape-tree-1' />
      <IllusTree2 className='shape-tree-2' />
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6 content-text col-md-7'>
            <div className='title'>Interested in my work?</div>
            <div className='actions'>
              <a className='btn btn-primary' href={resumeFile} download>
                <i className='ri-download-2-fill'></i>
                Download Resume
              </a>
              <Link className='btn btn-outline' to='/resume'>
                <i className='ri-eye-line'></i>
                View Resume
              </Link>
            </div>
          </div>
          <div className='col-lg-6 content-bg col-md-5' ref={svgRef}>
            <IllusHuman2 />
          </div>
        </div>
      </div>
    </section>
  )
}
