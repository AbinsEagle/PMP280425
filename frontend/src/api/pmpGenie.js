import axios from 'axios';

const API_URL = 'https://api.example.com/generate-questions'; // Replace with the actual API URL

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
    throw error;
  }
}