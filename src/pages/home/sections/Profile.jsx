import Illustration from '../../../assets/images/SVG/human_2.svg?react'

function Item({ activated, type, label, value, href, emoji, birthYear, icon }) {
  const iconClassName = icon.className !== null ? icon.className : ''
  const iconTextColor = icon.textColor !== null ? icon.textColor : ''

  if (activated) {
    if (type === 'dob') {
      return (
        <li>
          <div className='title'>{label}</div>
          <span>{value} &nbsp;</span>
          <i style={{ color: 'var(--fg-main)' }}>(age {new Date().getFullYear() - birthYear})</i>
        </li>
      )
    } else if (type === 'email') {
      return (
        <li>
          <div className='title'>{label}</div>
          <div className='content'>
            <a href={'mailto:' + value}>{value}</a>
            <i className={iconClassName} style={{ color: iconTextColor }}></i>
          </div>
        </li>
      )
    } else if (type === 'phone') {
      return (
        <li>
          <div className='title'>{label}</div>
          <div className='content'>
            <a href={'mailto:' + value}>{value}</a>
            <i className={iconClassName} style={{ color: iconTextColor }}></i>
          </div>
        </li>
      )
    } else if (type === 'social') {
      return (
        <li>
          <div className='title'>{label}</div>
          <div className='content'>
            <a href={href}>{value}</a>
            <i className={iconClassName} style={{ color: iconTextColor }}></i>
          </div>
        </li>
      )
    } else if (type === 'exp') {
      return (
        <li>
          <div className='title'>{label}</div>
          <span>
            {new Date().getFullYear() - 1 - value}
            &nbsp;yrs+ &nbsp;
            <i style={{ color: 'var(--fg-subtlest)' }}>({value} - Present)</i>
          </span>
        </li>
      )
    } else if (type === 'personality') {
      return (
        <li className='align-items-center'>
          <div className='personality-progress'>
            <div className='label'>
              <span>
                <b>Introvert </b>({value})
              </span>
              <span>
                <b>Extrovert</b>
              </span>
            </div>
            <div className='holder'>
              <div className='tracker'></div>
              <span className='emoji'>{emoji}</span>
            </div>
          </div>
        </li>
      )
    } else {
      return (
        <li>
          <div className='title'>{label}</div>
          <span>{value}</span>
        </li>
      )
    }
  }
}

export function Profile({ data }) {
  const listItems = data.map((item) => {
    return (
      <Item
        key={item.id}
        type={item.type}
        label={item.label}
        value={item.value}
        href={item.href}
        icon={item.icon}
        activated={item.activated}
        birthYear={item.birthYear}
        emoji={item.emoji}
      />
    )
  })
  return (
    <section className='section section-profile'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-md-7 col-lg-6 content-bg d-inline-flex justify-content-center'>
            <Illustration viewBox='0 0 466 368' />
          </div>
          <div className='col-md-5 col-lg-6 content-text'>
            <div className='section-heading'>
              <div className='section-title'>Profile</div>
            </div>
            <div className='profile-content'>
              <ul>{listItems}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
