import axios from 'axios';

// Endpoint for the PMP Genie API. This can be overridden using the
// `REACT_APP_PMP_GENIE_URL` environment variable when starting the
// React development server or building the app.
const API_URL =
  process.env.REACT_APP_PMP_GENIE_URL ||
  'https://api.example.com/generate-questions';

/**
 * Fetch questions from PMP Genie (GPT API).
 * @param {number} totalQuestions - Number of questions to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of questions.
 */
export async function fetchQuestionsFromPMPGenie(totalQuestions) {
  try {
    const response = await axios.post(API_URL, { totalQuestions });
    return response.data.questions; // Adjust based on the API response structure
  } catch (error) {
    console.error('Error fetching questions from PMP Genie:', error);
    // Provide a human readable message so the UI can surface it
    throw new Error('Failed to fetch questions. Please try again.');
  }
}