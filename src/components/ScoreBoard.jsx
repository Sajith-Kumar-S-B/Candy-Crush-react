import React, { useEffect, useRef, useState } from 'react'
import bellSound from '../images/decidemp3-14575.mp3'



function ScoreBoard({score}) {

  const audioRef = useRef(null);

  const playBellSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }
  
  useEffect(() => {
   if(score>20){
      playBellSound();}
    },[score])

    
        
  return (
    <div className="score-board">
      <h2>Your Score:{' '}{score}
      <br />{score>20 && <i className="fa-solid fa-star fa-beat"></i>
     }
      {score>50 &&  <i className="fa-solid fa-star fa-beat"></i>}
      {score>100 &&  <i className="fa-solid fa-star fa-beat"></i>}
      </h2>
      <audio ref={audioRef}  src={bellSound}/>
    </div>
  )
}

export default ScoreBoard