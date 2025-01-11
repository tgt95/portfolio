import React, { useRef, useEffect, useState } from 'react'

import Illustration from '../../../assets/images/SVG/human_1.svg?react'
import { mediaBreakpoint, spacer, getHeight, getWidth } from '../../../ultils/helpers'

import Typewriter from 'typewriter-effect'

export function Banner({ title, description }) {
  const svgRef = useRef(null) // Ref for the SVG
  const rowRef = useRef(null) // Ref for the row container
  const textRef = useRef(null) // Ref for the text

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [svgHeight, setSvgHeight] = useState('0px') // State to store the SVG height

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Get the height of the SVG after rendering
    if (svgRef.current) {
      const height = svgRef.current.getBoundingClientRect().height
      setSvgHeight(height + 'px')
    }
  }, []) // Run only after the first render

  useEffect(() => {
    const background = svgRef.current
    const svg = svgRef.current.children[0]
    const row = rowRef.current
    const text = textRef.current

    if (!svg || !row || !text || !background) return

    if (windowWidth >= mediaBreakpoint.lg) {
      setSvgHeight(getHeight(svgRef.current) + 'px')
    } else if (windowWidth >= mediaBreakpoint.md && windowWidth < mediaBreakpoint.lg) {
      const width = parseInt(getWidth(svg) + spacer[4], 10)
      const mt = 320

      setSvgHeight('auto')

      svg.setAttribute('width', `${width}px`)
      svg.setAttribute('viewBox', `0 0 ${width} 1093`)
      svg.style.transform = `translate(-164px, -${mt}px)`

      text.style.marginTop = `${spacer[5]}px`
      background.style.height = `${getHeight(svg) - mt}px`
    }
    // Mobile Large: >= sm: 576 and < md: 768px
    else if (windowWidth >= mediaBreakpoint.sm && windowWidth < mediaBreakpoint.md) {
      const width = parseInt(windowWidth + spacer[5] + 480, 10)
      const height = 900

      setSvgHeight('auto')

      svg.setAttribute('width', `${width}px`)
      svg.setAttribute('height', `${height}px`)
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      svg.style.transform = `translateX(-184px)`

      text.style.marginTop = `${spacer[5]}px`
      svg.style.marginTop = `-${spacer[7] + spacer[5]}px`
    }
    // Mobile Small: >= xxs: 32px and < xs: 414px
    else if (windowWidth >= mediaBreakpoint.xxs && windowWidth < mediaBreakpoint.sm) {
      const width = parseInt(windowWidth + spacer[5] + 480, 10)
      const height = 800

      setSvgHeight('auto')

      svg.setAttribute('width', `${width}px`)
      svg.setAttribute('height', `${height}px`)
      svg.setAttribute('viewBox', `0 0 ${1200} ${height}`)
      svg.style.transform = `translateX(-184px)`

      text.style.marginTop = `${spacer[5]}px`
      svg.style.marginTop = `-${spacer[7] + spacer[5]}px`
    }
  }, []) // Run only after the first render

  return (
    <section className='section section-banner'>
      <div className='container'>
        <div className='align-items-center row' ref={rowRef} style={{ height: svgHeight }}>
          <div className='col-lg-6 content-text' ref={textRef}>
            <div className='title'>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(title.text_1)
                    .deleteAll()
                    // .deleteChars(title.text_1.length)
                    // .pauseFor(2200)
                    .typeString(title.text_2)
                    .pauseFor(100)
                    .deleteChars(title.text_2.length)
                    .typeString(title.text_3)
                    .pauseFor(1000)
                    .start()
                }}
                options={{
                  autoStart: true,
                  loop: true
                  // wrapperClassName: "title",
                  // cursorClassName: "title",
                }}
              />
            </div>
            <p>{description}</p>
          </div>
        </div>
        <div className='col-lg-6 content-bg' ref={svgRef}>
          <Illustration />
        </div>
      </div>
    </section>
  )
}
