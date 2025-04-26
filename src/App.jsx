import React, { useState } from "react";
import "./App.css";
import TestComponent from "./components/TestComponent";
import initialData from "./jsonData/jsonData.json"
import genratePDF from "./pdfDownloadLogic.js"

const App = () => {
  const [questions, SetQuestions] = useState(initialData);
  const [currentIdx, setCurrentIdx] = useState(0);

  
  

  const updateAnswer = (answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIdx].answer = answer;
    SetQuestions(updatedQuestions);
    console.log(updatedQuestions);
  };

  const nextHandleFunction = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }

  };

  const downloadResult = ()=>{
    genratePDF();
  }

  return (
    <div className="app-container">
      <h1>Dictation Test Practice</h1>
      <div className="main">
        <TestComponent
          data={questions[currentIdx]}
          updateAnswerChange={updateAnswer}
        />
      </div>
      {

        currentIdx<questions.length-1?<button className="nextButtonDiv" onClick={nextHandleFunction}>
          Next
        </button>
        :
        <button className="download-button" 
        onClick={downloadResult}>
          Download Result
        </button>
      }
    </div>
  );
};

export default App;
