// api.js

const BASE_URL = 'https://api.npoint.io'

// Function to make a GET request to fetch data from an API endpoint
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// Function to make a POST request to submit data to an API endpoint
export const submitData = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      throw new Error('Failed to submit data')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error submitting data:', error)
    throw error
  }
}
