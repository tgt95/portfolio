export function mobileResponsive() {
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Window Onload
  document.addEventListener('DOMContentLoaded', e => {
    if (isMobile) {
      document.body.classList.add('is-mobile')
  
      // Fix bug for use Navigation bottom
      document.body.style.paddingBottom = document.querySelector('.header').offsetHeight + 'px'
    } else {
      document.body.classList.remove('is-mobile')
    }
  });
}

export const baseURL = __REACT_APP_BASE_URL__
export const projectPassCode = import.meta.env.VITE_PROJECT_PASSCODE
// export const baseURL = process.env.REACT_APP_BASE_URL
