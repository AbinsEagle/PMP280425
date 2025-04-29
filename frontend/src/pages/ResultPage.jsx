import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExcelExportButton from '../components/ExcelExportButton';

export default function ResultPage() {
  const { questionLog = [], totalTime = 0 } = useLocation().state || {};
  const navigate = useNavigate();

  const correctCount = questionLog.filter(q => q.correct).length;
  const totalQ = questionLog.length;
  const pct = totalQ ? Math.round((correctCount / totalQ) * 100) : 0;

  // Calculate average time per question
  const avgTime = totalQ ? Math.floor(totalTime / totalQ) : 0;

  const fmt = sec => {
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          <span role="img" aria-label="cap">🎓</span> Exam Summary
        </h1>

        <table className="w-full text-gray-700 border-collapse">
          <tbody>
            {/* Row 1: Score */}
            <tr className="border-b">
              <td className="py-3 px-4 text-left font-bold">Score:</td>
              <td
                className={`py-3 px-4 text-right font-bold text-lg ${
                  pct < 60 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {pct}%
              </td>
            </tr>

            {/* Row 2: Total Questions */}
            <tr className="border-b">
              <td className="py-3 px-4 text-left font-bold">Total Questions:</td>
              <td className="py-3 px-4 text-right font-bold text-lg">{totalQ}</td>
            </tr>

            {/* Row 3: Correct Answers */}
            <tr className="border-b">
              <td className="py-3 px-4 text-left font-bold">Correct Answers:</td>
              <td className="py-3 px-4 text-right font-bold text-lg">{correctCount}</td>
            </tr>

            {/* Row 4: Total Time */}
            <tr className="border-b">
              <td className="py-3 px-4 text-left font-bold">Total Time:</td>
              <td className="py-3 px-4 text-right font-bold text-lg">{fmt(totalTime)}</td>
            </tr>

            {/* Row 5: Average Time per Question */}
            <tr>
              <td className="py-3 px-4 text-left font-bold">Average Time per Question:</td>
              <td className="py-3 px-4 text-right font-bold text-lg">{fmt(avgTime)}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            <span role="img" aria-label="restart">🔁</span> Restart
          </button>
          <button
            onClick={() => navigate('/review', { state: { questionLog } })}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            <span role="img" aria-label="review">🔍</span> Review
          </button>
        </div>

        {/* Center-aligned Export to Excel Button */}
        <div className="flex justify-center mt-6">
          <ExcelExportButton />
        </div>
      </div>
    </div>
  );
}
