import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ReviewPage() {
  const { questionLog = [] } = useLocation().state || {};
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);

  if (!questionLog.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <span role="img" aria-label="warn">⚠️</span> No review data – please restart.
      </div>
    );
  }

  const q = questionLog[idx];
  const label = q.question;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-4">
          <button disabled={idx===0} onClick={()=>setIdx(i=>i-1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
            <span role="img" aria-label="prev">⬅️</span> Prev
          </button>
          <h2 className="font-semibold">
            Reviewing {label} ({idx+1}/{questionLog.length})
          </h2>
          <button disabled={idx===questionLog.length-1} onClick={()=>setIdx(i=>i+1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
            Next <span role="img" aria-label="next">➡️</span>
          </button>
        </div>

        {/* Since we only stored times & correctness in questionLog, you
            may want to enrich this object earlier with the actual question text
            and user’s selected answer... */}
        <p className="mb-4">You answered this in {q.time}s and it was {q.result}</p>

        <button onClick={()=>navigate('/results')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
          <span role="img" aria-label="back">🔙</span> Back to Results
        </button>
      </div>
    </div>
  );
}
