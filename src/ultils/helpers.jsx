export function convertToPathName(fullName) {
  // Convert spaces to dashes and make lowercase
  return fullName.toLowerCase().replace(/\s+/g, '-')
}

export const getHeight = (el) => el.getBoundingClientRect().height
export const getWidth = (el) => el.getBoundingClientRect().width

/**
 * Get the dimensions (width and height) of an image from its URL.
 * @param {string} url - The URL of the image.
 * @returns {Promise<{width: number, height: number}>} A promise that resolves with the image dimensions.
 */
export function getImageSize(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url

    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }

    img.onerror = (error) => {
      reject(new Error(`Error loading image: ${url}`))
    }
  })
}

export const spacer = []
;(() => {
  let temp
  for (let i = 1; i <= 10; i++) {
    temp = temp === undefined ? 2 : temp + temp
    spacer.push(temp)
  }
})()

export const mediaBreakpoint = {
  xxs: 320,
  xs: 414,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1600
}
