export function Blog({ data }) {
  const listItems = data.map((item, index) => {
    return (
      <div className='col-lg-3 col-md-6 item' key={index}>
        <div className='item-thumbnail'>
          <img src={item.thumbnailURL} alt={item.title} />
          <a className='overlay-content' href={item.externalURL}>
            <div className='text-center'>
              <i className='icon ri-external-link-line'></i>
              <div className='text'>{item.guideText}</div>
            </div>
          </a>
        </div>
        <div className='title'>{item.title}</div>
      </div>
    )
  })

  return (
    <section className='section section-blog has-divider'>
      <div className='container'>
        <div className='section-heading'>
          <div className='section-title'>Knowledge sharing</div>
          <div className='section-description'>What I learned during my work</div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>{listItems}</div>
      </div>
    </section>
  )
}
