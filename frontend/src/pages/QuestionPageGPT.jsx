import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchQuestionsFromPMPGenie } from '../api/pmpGenie';

export default function QuestionPageGPT() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalQuestions = state?.totalQuestions || 5;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const qs = await fetchQuestionsFromPMPGenie(totalQuestions);
        setQuestions(qs.slice(0, totalQuestions));
        setError('');
      } catch (err) {
        console.error('Failed to load questions from PMP Genie:', err);
        setError(err.message || 'Failed to fetch questions. Please try again.');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [totalQuestions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">Loading questions...</div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error || 'Failed to load questions.'}
      </div>
    );
  }

  const handleNext = () => {
    const next = currentIndex + 1;
    if (next >= questions.length) {
      navigate('/results', { state: { questionLog: [] } });
    } else {
      setCurrentIndex(next);
      setSelectedOption(null);
    }
  };

  const q = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-6">
        <h2 className="text-lg font-semibold mb-2">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <p className="mb-3 text-gray-800">{q.question}</p>
        <div className="space-y-1 mb-4">
          {q.options.map((opt, i) => (
            <label
              key={i}
              className="block border p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="opt"
                className="mr-2"
                checked={selectedOption === opt}
                onChange={() => setSelectedOption(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-full py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600"
        >
          {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
