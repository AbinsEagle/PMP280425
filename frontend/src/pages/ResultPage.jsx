import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExcelExportButton from '../components/ExcelExportButton';

export default function ResultPage() {
  const { questionLog = [], totalTime = 0 } = useLocation().state || {};
  const navigate = useNavigate();

  const correctCount = questionLog.filter(q => q.correct).length;
  const totalQ      = questionLog.length;
  const pct         = totalQ ? Math.round((correctCount/totalQ)*100) : 0;

  const fmt = sec => {
    const m = Math.floor(sec/60), s = sec%60;
    return `${m}:${s.toString().padStart(2,'0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          <span role="img" aria-label="cap">🎓</span> Exam Summary
        </h1>

        <ul className="text-gray-700 mb-6 space-y-1">
          <li><strong>Total Questions:</strong> {totalQ}</li>
          <li><strong>Correct Answers:</strong> {correctCount}</li>
          <li><strong>Score:</strong> {pct}%</li>
          <li><strong>Total Time:</strong> {fmt(totalTime)}</li>
        </ul>

        <div className="flex gap-4">
          <button
            onClick={()=>navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            <span role="img" aria-label="restart">🔁</span> Restart
          </button>
          <button
            onClick={()=>navigate('/review', { state: { questionLog } })}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            <span role="img" aria-label="review">🔍</span> Review
          </button>
        </div>

        <div className="mt-6">
          <ExcelExportButton />
        </div>
      </div>
    </div>
  );
}
