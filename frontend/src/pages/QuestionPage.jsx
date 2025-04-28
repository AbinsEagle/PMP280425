import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";

export default function QuestionPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalQuestions = state?.totalQuestions || 5;

  // 🔧 Dummy questions – replace with API call later
  const questions = [
    {
      id: 1,
      question: "What is the first phase in a project lifecycle?",
      options: ["Planning", "Execution", "Initiation", "Closure"],
      correct: "Initiation",
    },
    {
      id: 2,
      question: "Who approves the project charter?",
      options: ["Sponsor", "Manager", "Stakeholder", "Customer"],
      correct: "Sponsor",
    },
    {
      id: 3,
      question: "What is the output of the planning phase?",
      options: ["Charter", "Scope Statement", "Schedule", "Report"],
      correct: "Scope Statement",
    },
    {
      id: 4,
      question: "What is a stakeholder register used for?",
      options: ["Identify Risks", "Record stakeholders", "Assign tasks", "Track schedule"],
      correct: "Record stakeholders",
    },
    {
      id: 5,
      question: "Which is NOT a knowledge area?",
      options: ["Integration", "Motivation", "Cost", "Scope"],
      correct: "Motivation",
    },
  ].slice(0, totalQuestions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionLog, setQuestionLog] = useState([]);
  const [questionTimer, setQuestionTimer] = useState(0);

  // total timer
  useEffect(() => {
    const id = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // per-question timer
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setQuestionTimer(0);
    const id = setInterval(() => setQuestionTimer(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [currentIndex]);

  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    const spent = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedOption === questions[currentIndex].correct;

    setQuestionLog(log => [
      ...log,
      { question: `Q${currentIndex+1}`, time: spent, correct: isCorrect, result: isCorrect ? "✅" : "❌" }
    ]);

    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
    } else {
      navigate("/results", {
        state: {
          questionLog,
          totalTime: timeElapsed,
          questions
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-8">

        {/* PMP Exam Coach Heading */}
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          PMP Exam Coach
        </h1>

        {/* top timers */}
        <div className="flex justify-between mb-6 text-sm text-gray-700">
          <div>
            <span role="img" aria-label="timer">⏱️</span>&nbsp;{formatTime(timeElapsed)}
            <div className="w-40 h-2 bg-gray-200 rounded mt-1">
              <div
                className="h-full bg-purple-500 rounded"
                style={{ width: `${Math.min((timeElapsed/(questions.length*72))*100,100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              This Question: {formatTime(questionTimer)}
            </div>
          </div>
          <div className="text-right">
            <span role="img" aria-label="progress">✅</span>&nbsp;
            {currentIndex+1}/{questions.length}
            <div className="w-40 h-2 bg-gray-200 rounded mt-1">
              <div
                className="h-full bg-green-500 rounded"
                style={{ width: `${((currentIndex+1)/questions.length)*100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question & Options */}
        <h2 className="text-xl font-semibold mb-2">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <p className="mb-4 text-gray-800">{questions[currentIndex].question}</p>

        <div className="space-y-3 mb-6">
          {questions[currentIndex].options.map((opt, i) => (
            <label key={i} className="block border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
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

        {/* Show Correct Answer and Rationale if the question is answered */}
        {selectedOption && (
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-800">
              <span className="font-bold">Correct Answer:</span> {questions[currentIndex].correct}
            </p>
            <p className="text-sm text-gray-800 mt-2">
              <span className="font-bold">Rationale:</span> This is where you can explain why the correct answer is correct. Replace this text with the actual rationale.
            </p>
          </div>
        )}

        {/* Next/Finish Button */}
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`w-full py-3 rounded-xl text-white font-bold ${
            !selectedOption ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {currentIndex + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>

      {/* bar chart log */}
      {questionLog.length > 0 && (
        <div className="mt-8 max-w-3xl mx-auto bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold mb-2">Question Log</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={questionLog}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="time">
                {questionLog.map((e, i) => (
                  <Cell key={i} fill={e.correct ? "#10B981" : "#EF4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
