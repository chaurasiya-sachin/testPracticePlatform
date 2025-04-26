import React, { useEffect, useRef } from 'react';
import "./TestComponent.css";

const TestComponent = ({data, updateAnswerChange}) => {
  const audioRef = useRef(null);

  const handleNewAnswer = (e) => {
    updateAnswerChange(e.target.value);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();  // This forces the audio to reload when the src changes
      audioRef.current.play();  // Optional: if you want to auto-play immediately after loading
    }
  }, [data.questionAudio]); // This runs whenever data.questionAudio changes

  console.log(data.questionAudio);

  return (
    <div className='testComponent'>
      <div className="left">
        {data.questionAudio !== "" ? (
          <audio ref={audioRef} controls>
            <source src={data.questionAudio} type="audio/mpeg" />
          </audio>
        ) : (
          <p>{data.question}</p>
        )}
      </div>
      <div className="right">
        <input 
          type="text"
          value={data.answer}
          onChange={(e) => handleNewAnswer(e)}
          placeholder="Enter your answer.."
        />
      </div>
    </div>
  );
};

export default TestComponent;
