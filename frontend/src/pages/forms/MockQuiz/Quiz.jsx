import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import QuestionCard from './QuestionCard';
import HeaderImg from "../../../assets/images/Family/FAMILY.png";
import Modal from "../../../components/Modal";
import ErrorModel from "./model/ErrorModel";
import alertSound from './call-to-attention.mp3';
import AttentionDataBox from "./AttentionDataBox";
import AttentionAlert from "./model/AttentionAlert";
import SuccessQuizModel from "./model/SuccessQuizModel";

const questions = [
  {
    question: "Anna had 8 apples. She gave 3 apples to her friend. How many apples does Anna have left?",
    answers: ["2", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    question: "John had 12 marbles. He lost 5 marbles. How many marbles does John have now?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    question: "There are 6 birds sitting on a wire. 2 more birds join them. How many birds are on the wire now?",
    answers: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    question: "Mom baked 10 cookies. Dad ate 3 cookies. How many cookies are left?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    question: "Sarah had 15 candies. She gave 6 candies to her brother. How many candies does Sarah have left?",
    answers: ["7", "8", "9", "10"],
    correctAnswer: "9"
  },
  {
    question: "Do you agree to complete this quiz independently and not to copy or plagiarize any content?",
    answers: ["Yes"],
    correctAnswer: "Yes"
  },
  {
    question: "What comes next in this pattern? 🐱, 🐶, 🐱, 🐶, ?",
    answers: ["🐱", "🐶", "🐥"],
    correctAnswer: "🐶"
  },
  {
    question: "Look at the pattern: 🔵, 🔴, 🔵, 🔴, 🔵, ?",
    answers: ["🔵", "🔴", "🟢"],
    correctAnswer: "🔴"
  },
  {
    question: "Which shape continues the series? △, △, □, △, △, ?",
    answers: ["△", "◯", "□"],
    correctAnswer: "□"
  },
  {
    question: "What is the next fruit in the pattern? 🍎, 🍌, 🍎, 🍌, ?",
    answers: ["🍎", "🍌", "🍇"],
    correctAnswer: "🍎"
  },
  {
    question: "Find the next in the sequence: 🚗, 🛴, 🚗, 🛴, ?",
    answers: ["🚲", "🚗", "🛴"],
    correctAnswer: "🛴"
  }
];



const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [quizSessionId] = useState(1234);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState('');
  const [attentionStatus, setAttentionStatus] = useState("");
  const [notAttentionCount, setNotAttentionCount] = useState(0);
  const [notAttentionCount2, setNotAttentionCount2] = useState(0);
  const [imageData, setImageData] = useState(null);
  const [totalAttentionCount, setTotalAttentionCount] = useState(0);
  const [attentionPercentage, setAttentionPercentage] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();
  const [showAttentionAlertModal, setShowAttentionAlertModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const eventSourceRef = useRef(null);

  const audioRef = useRef(new Audio(alertSound));

  useEffect(() => {
    setStartTime(new Date());
    let errorOccurred = false;

    eventSourceRef.current = new EventSource('http://127.0.0.1:5000/video');

    eventSourceRef.current.onmessage = function(event) {
      if (!errorOccurred) {
        const data = JSON.parse(event.data);
        console.log(data);
        setImageData(`data:image/jpeg;base64,${data.frame}`);
        setAttentionStatus(data.Prediction);
        setTotalAttentionCount(prevCount => prevCount + 1);

        if (data.Prediction === "not_attention" || data.Prediction === "No face detected") {
          setNotAttentionCount(prevCount => prevCount + 1);
          setNotAttentionCount2(prevCount => prevCount + 1)
        } else {
          setNotAttentionCount(0);
        }
      }
    };

    eventSourceRef.current.onerror = function() {
      errorOccurred = true;
      setAttentionStatus("Error");
      setShowErrorModal(true);
      console.log("An error occurred while receiving the stream.");
      audioRef.current.pause();
      eventSourceRef.current.close();
    };

    return () => eventSourceRef.current.close();
  }, []);

  useEffect(() => {
    if (notAttentionCount >= 30) {
      audioRef.current.play();
      setShowAttentionAlertModal(true);
    } else {
      setShowAttentionAlertModal(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    console.log(notAttentionCount);
  }, [notAttentionCount]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedAnswer
      }));
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer('');
    } else {
      setShowModal(true);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedAnswer(answers[currentQuestionIndex - 1] || '');
  };

  const handleSubmit = () => {

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedAnswer
  }));

      // Stop the API call
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    if (selectedAnswer) {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedAnswer
      }));

      const quizData = {
        quizSessionId,
        startTime,
        endTime: new Date(),
        answers: { ...answers, [currentQuestionIndex]: selectedAnswer }
      };

      console.log(answers);
      console.log(questions)

      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].correctAnswer) {
          score += 1;
        }
      }
      setTotalScore(score);

      // Calculate attention percentage
      const attentionPercentage = ((totalAttentionCount - notAttentionCount2) / totalAttentionCount) * 100;
      setAttentionPercentage(attentionPercentage);
      console.log(totalAttentionCount + "||" + notAttentionCount2)

      // Store quiz data in localStorage
      const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
      storedQuizzes.push(quizData);
      localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));

      setShowForm('submit');
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const currentQuestionNumber = currentQuestionIndex;

  const closeModal = () => {
    setShowAttentionAlertModal(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setNotAttentionCount(0);
  };

  return (

    <div className="bg-cover bg-center bg-fixed">
      <div className="flex justify-center ">
        <AttentionDataBox text={attentionStatus} imageUrl={imageData}/>
      <div>
    
        {/* <iframe src={alertSound} allow="autoplay" id="audio" style={{ display: 'none' }}></iframe> */}
        <audio id="player"  loop>
          <source src={alertSound} type="audio/mp3" />
        </audio>
    </div>

        <div
          className="w-full h-80 relative rounded-t-3xl bg-stone-100 bg-no-repeat bg-cover bg-contain bg-center"
          style={{ backgroundImage: `url(${HeaderImg})` }}
        >
          <div className="absolute top-0 left-0 ml-4 mt-4">
            <AwesomeButton
              type="primary"
              onReleased={() => {
                navigate("/");
              }}
              style={{
                "--button-primary-color": "#de2183",
                "--button-primary-color-dark": "#c20d95",
                "--button-primary-color-light": "#ffffff",
                "--button-primary-color-hover": "#de2183",
                "--button-primary-color-active": "#c20d95",
                "--button-default-border-radius": "8px",
                width: "120px",
                height: "45px",
                marginRight: "10px",
                borderStyle: "solid",
                borderRadius: "10px",
                borderColor: "black",
              }}
            >
              Go Back
            </AwesomeButton>
          </div>

          <div className="flex justify-center items-center h-full">
            <span className="text-5xl">General Knowledge</span>
          </div>
        </div>
      </div>

      <div className="bg-sky-100 w-100 h-100 pb-60">
        <div className="flex justify-center items-center pt-5">
          {questions.length > 0 && currentQuestionIndex < questions.length && (
            <QuestionCard
              questionIndex={currentQuestionNumber}
              question={questions[currentQuestionIndex].question}
              answers={questions[currentQuestionIndex].answers}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
            />
          )}
          <div className="navigation-buttons"></div>
        </div>

        <div className="flex justify-center items-center pb-10 ">
          <div className="w-full mr-10 flex justify-end items-center">
            {currentQuestionIndex > 0 && (
              <AwesomeButton
                type="primary"
                onReleased={handlePrevQuestion}
                style={{
                  "--button-primary-color": "#21b8de",
                  "--button-primary-color-dark": "#0494b8",
                  "--button-primary-color-light": "#ffffff",
                  "--button-primary-color-hover": "#12a0c4",
                  "--button-primary-color-active": "#038aab",
                  "--button-default-border-radius": "8px",
                  width: "120px",
                  height: "45px",
                  marginRight: "10px",
                  borderStyle: "solid",
                  borderRadius: "10px",
                  borderColor: "black",
                }}
              >
                Back
              </AwesomeButton>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <AwesomeButton
                type="primary"
                onReleased={handleNextQuestion}
                style={{
                  "--button-primary-color": "#21b8de",
                  "--button-primary-color-dark": "#0494b8",
                  "--button-primary-color-light": "#ffffff",
                  "--button-primary-color-hover": "#12a0c4",
                  "--button-primary-color-active": "#038aab",
                  "--button-default-border-radius": "8px",
                  width: "120px",
                  height: "45px",
                  marginRight: "10px",
                  borderStyle: "solid",
                  borderRadius: "10px",
                  borderColor: "black",
                }}
              >
                Next
              </AwesomeButton>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <AwesomeButton
                type="primary"
                onReleased={handleSubmit}
                style={{
                  "--button-primary-color": "#deac21",
                  "--button-primary-color-dark": "#997000",
                  "--button-primary-color-light": "#ffffff",
                  "--button-primary-color-hover": "#af8718",
                  "--button-primary-color-active": "#a07b17",
                  "--button-default-border-radius": "8px",
                  width: "120px",
                  height: "45px",
                  marginRight: "10px",
                  borderStyle: "solid",
                  borderRadius: "10px",
                  borderColor: "black",
                }}
              >
                Submit
              </AwesomeButton>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        message="Hey you need to answer everything to go to the next :)"
        onClose={handleCloseModal}
      />
      {showAttentionAlertModal &&  <AttentionAlert quiz="Mock Quiz" closeModal={closeModal}/>}
      {showForm === "submit" && <SuccessQuizModel quiz={"Mock Quiz"} score={totalScore} attentionPercentage={attentionPercentage}/>}
      {showErrorModal && <ErrorModel/>}
    </div>

  );
};

export default Quiz;
