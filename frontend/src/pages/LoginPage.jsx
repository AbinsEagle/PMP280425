import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [estimated, setEstimated] = useState(0);
  const [questionSource, setQuestionSource] = useState('inbuilt'); // Default to inbuilt questions

  useEffect(() => {
    setEstimated((numQuestions * 1.2).toFixed(1));
  }, [numQuestions]);

  const handleStart = () => {
    navigate('/questions', {
      state: {
        userName: name,
        totalQuestions: numQuestions,
        questionSource, // Pass the selected source
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 relative">
      <div className="bg-white bg-opacity-30 p-8 rounded-xl shadow-xl shadow-gray-500/50 w-full max-w-xl z-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-blue-600">
          PMP Exam Practice
        </h1>
        <p className="text-gray-600 text-center mb-6 italic">
          "Did you know? 39% of projects fail due to lack of planning!"
        </p>

        <label className="block text-gray-700 mb-2">Your Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label className="block text-gray-700 mb-2">Number of Questions</label>
        <input
          type="number"
          min="1"
          className="w-full border rounded px-3 py-2 mb-4"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
        />

        <label className="block text-gray-700 mb-2">Question Source</label>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setQuestionSource('inbuilt')}
            className={`px-4 py-2 rounded-lg ${
              questionSource === 'inbuilt' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Inbuilt Questions
          </button>
          <button
            onClick={() => setQuestionSource('pmp-genie')}
            className={`px-4 py-2 rounded-lg ${
              questionSource === 'pmp-genie' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            PMP Genie (GPT API)
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          You should complete this session in about&nbsp;
          <span className="font-bold text-blue-600">{estimated} minutes</span>
          &nbsp;<span className="animate-pulse">...</span>
        </p>

        <button
          disabled={!name.trim()}
          onClick={handleStart}
          className={`w-full py-3 rounded-xl text-white font-bold ${
            !name.trim()
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}
