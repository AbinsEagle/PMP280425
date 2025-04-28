import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage    from './pages/LoginPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage   from './pages/ResultPage';
import ReviewPage   from './pages/ReviewPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/questions" element={<QuestionPage />} />
      <Route path="/results" element={<ResultPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
