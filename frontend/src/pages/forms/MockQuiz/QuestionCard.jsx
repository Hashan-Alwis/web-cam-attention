import React from 'react';

const QuestionCard = ({ questionIndex, question, answers, selectedAnswer, onAnswerSelect }) => {

  const questionNumber = questionIndex + 1;

  return (
    <div className={`bg-white py-10 font-short-stack p-6 rounded-3xl shadow-md mb-12 ` }>
      <div className="mb-4">
        <label className="block text-xl font-semibold mb-2">
           {questionNumber}. {question}
        </label>
        <div className="flex flex-col space-x-8">
          {answers.map((answer, index) => (
            <>              
              <br/>
              <label key={index}>
                <input
                  type="radio"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={() => onAnswerSelect(answer)}
                />
                &nbsp;  {answer}
              </label>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
