import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [name, setName]               = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [estimated, setEstimated]     = useState(0);

  useEffect(() => {
    // 1.2 minutes per question
    setEstimated((numQuestions * 1.2).toFixed(1));
  }, [numQuestions]);

  const handleStart = () => {
    navigate('/questions', {
      state: { 
        userName: name,
        totalQuestions: numQuestions 
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 relative">
      {/* Background Image Positioned in the Left Corner */}
      <img
        src="/frontend/undraw_work-time_zbsw.svg" // Path to your SVG file
        alt="Background Art"
        className="absolute top-0 left-0 w-1/3 h-auto opacity-50"
      />

      {/* Main Content */}
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
              ? "bg-green-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}
