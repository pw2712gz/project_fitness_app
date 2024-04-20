export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.REACT_APP_EXERCISEDB_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_EXERCISEDB_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_YOUTUBE_HOST,
  },
};

export const BMIOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
  },
};

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Handling HTTP errors, e.g., 404, 500 etc
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.message || 'Unknown error'} with status ${response.status}`);
    }
    return response.json(); // Parse JSON only if the response was OK.
  } catch (error) {
    // Handling network errors or errors thrown from the condition above
    console.error('Fetch error:', error.message);
    throw error; // Re-throw the error for further handling upstream if necessary
  }
};

