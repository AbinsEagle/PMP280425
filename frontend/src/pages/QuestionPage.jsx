import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList
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
    // PMP-alike questions start here
    {
      id: 6,
      question: "What is the primary purpose of a project charter?",
      options: [
        "Define the project scope",
        "Authorize the project",
        "Identify stakeholders",
        "Create the project schedule",
      ],
      correct: "Authorize the project",
    },
    {
      id: 7,
      question: "Which process involves identifying and documenting project roles?",
      options: [
        "Plan Resource Management",
        "Develop Project Charter",
        "Define Scope",
        "Control Resources",
      ],
      correct: "Plan Resource Management",
    },
    {
      id: 8,
      question: "What is the critical path in project management?",
      options: [
        "The shortest path to complete the project",
        "The longest path to complete the project",
        "The path with the least resources",
        "The path with the most risks",
      ],
      correct: "The longest path to complete the project",
    },
    {
      id: 9,
      question: "Which tool is used to visually represent the project schedule?",
      options: ["Gantt Chart", "Risk Register", "Scope Statement", "WBS"],
      correct: "Gantt Chart",
    },
    {
      id: 10,
      question: "What is the primary goal of risk management?",
      options: [
        "Eliminate all risks",
        "Identify and mitigate risks",
        "Increase project costs",
        "Delay project timelines",
      ],
      correct: "Identify and mitigate risks",
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
    const id = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // per-question timer
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setQuestionTimer(0);
    const id = setInterval(() => setQuestionTimer((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [currentIndex]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    const spent = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedOption === questions[currentIndex].correct;

    setQuestionLog((log) => [
      ...log,
      {
        question: `Q${currentIndex + 1}`,
        time: spent,
        correct: isCorrect,
        result: isCorrect ? "✅" : "❌",
      },
    ]);

    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigate("/results", {
        state: {
          questionLog,
          totalTime: timeElapsed,
          questions,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-gray-800">PMP Exam Coach</h1>
          <div className="flex justify-start space-x-4 text-sm italic text-gray-600 mt-1">
            <div>
              <span role="img" aria-label="timer">⏱️</span> Exam Time: {formatTime(timeElapsed)}
            </div>
            <div>
              <span role="img" aria-label="timer">⏱️</span> Question Time: {formatTime(questionTimer)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded mt-1">
          <div
            className="h-full bg-green-500 rounded"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question & Options */}
        <h2 className="text-lg font-semibold mb-2">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <p className="mb-3 text-gray-800">{questions[currentIndex].question}</p>

        <div className="space-y-1 mb-4">
          {questions[currentIndex].options.map((opt, i) => (
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

        {/* Buttons: Home, Back, and Next/Finish */}
        <div className="flex items-center justify-between mt-3">
          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="w-1/6 py-2 rounded-lg border border-gray-500 text-gray-500 font-bold hover:bg-gray-100"
          >
            Home
          </button>

          {/* Back and Next/Finish Buttons */}
          <div className="flex w-5/6 justify-end space-x-4">
            {/* Back Button */}
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              className="w-1/3 py-2 rounded-lg bg-gray-500 text-white font-bold hover:bg-gray-600"
            >
              Back
            </button>

            {/* Next/Finish Button */}
            <button
              onClick={handleNext}
              className="w-1/3 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600"
            >
              {currentIndex + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        </div>

        {/* Show Correct Answer and Rationale below the button */}
        {selectedOption && (
          <div className="bg-gray-100 p-2 rounded-lg mt-3">
            <p className="text-sm text-gray-800">
              <span className="font-bold">Correct Answer:</span>{" "}
              {questions[currentIndex].correct}
            </p>
            <p className="text-sm text-gray-800 mt-1">
              <span className="font-bold">Rationale:</span> This is where you can
              explain why the correct answer is correct. Replace this text with the
              actual rationale.
            </p>
          </div>
        )}
      </div>

      {/* Sleek Bar Chart */}
      {questionLog.length > 0 && (
        <div className="mt-8 max-w-3xl mx-auto bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold mb-2">Question Log</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={questionLog} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="question" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="time" radius={[4, 4, 0, 0]} fill="#4CAF50">
                {questionLog.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.correct ? "#4CAF50" : "#F44336"} />
                ))}
                {/* Add labels to each bar */}
                <LabelList
                  dataKey="time"
                  position="top"
                  formatter={(value) => `${Math.floor(value / 60)}m ${value % 60}s`}
                  style={{ fontSize: 12, fill: "#333" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
