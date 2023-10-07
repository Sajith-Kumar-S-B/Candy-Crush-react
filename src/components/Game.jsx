import React, { useEffect, useState } from 'react'
import ScoreBoard from './ScoreBoard'
import blueCandy from '../images/blue-candy.png';
import greenCandy from '../images/green-candy.png';
import orangeCandy from '../images/orange-candy.png';
import redCandy from '../images/red-candy.png';
import purpleCandy from '../images/purple-candy.png';
import yellowCandy from '../images/yellow-candy.png';
import blank from '../images/blank.png'
import loadingImage2 from '../images/candy-crush-soda-candy-crush.gif'
import Confetti from 'react-confetti';
import loadingImage from "../images/d947015873fef71db22d56c4e37c661e.gif";

const width = 8;

const candyColors = [
  blueCandy,yellowCandy,redCandy,greenCandy,orangeCandy, purpleCandy
]
const milestoneScores = [20,21,22,23,50,51,52,53,54,100,101,102,103,104,200,500,1000,1500,2000]

function Game() {

    const [currentColorArrangement,setCurrentColorArrangement] = useState([])
 const [squareDragged,setSquareDragged] = useState(null)
 const [squareReplaced,setSquareReplaced] = useState(null)
 const [scoreDisplay,setScoreDisplay] = useState(0)
 const [showConfetti, setShowConfetti] = useState(false);
const [showBanner,setShowBanner] = useState(false)
    const checkColumnOfFour =()=>{
   
        for(let i=0;i<=39;i++){
          const columnOfFour = [i,i+width,i+width*2,i+width*3]
          const decidedColor = currentColorArrangement[i]
          const isBlank = currentColorArrangement[i]===blank
          if(columnOfFour.every(square =>currentColorArrangement[square]===decidedColor && !isBlank)){
           
                setScoreDisplay((score)=>score+4)
                 columnOfFour.forEach(square=>currentColorArrangement[square]= blank)  
                 return true                  
          }
         
        }
      }
    
    
      const checkColumnOfThree =()=>{
        for(let i=0;i<=47;i++){
          const columnOfThree = [i,i+width,i+width*2]
          const decidedColor = currentColorArrangement[i]
          const isBlank = currentColorArrangement[i]===blank
    
          if(columnOfThree.every(square =>currentColorArrangement[square]===decidedColor && !isBlank)){
            setScoreDisplay((score)=>score+3)
                 columnOfThree.forEach(square=>currentColorArrangement[square]=blank)  
                 return true                  
          }
        }
      }
    
      const checkRowOfFour =()=>{
        for(let i=0;i<64;i++){
          const rowOfFour = [i,i+1,i+2,i+3]
          const decidedColor = currentColorArrangement[i]
          const isBlank = currentColorArrangement[i]===blank
    
          const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
          if(notValid.includes(i)) continue
          if(rowOfFour.every(square =>currentColorArrangement[square]===decidedColor && !isBlank)){
            setScoreDisplay((score)=>score+4)
                 rowOfFour.forEach(square=>currentColorArrangement[square]= blank)  
                 return true   
                       
          }
        }
      }
    
      const checkRowOfThree =()=>{
        for(let i=0;i<64;i++){
          const rowOfThree = [i,i+1,i+2]
          const decidedColor = currentColorArrangement[i]
          const isBlank = currentColorArrangement[i]===blank
    
          const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
          if(notValid.includes(i)) continue
          if(rowOfThree.every(square =>currentColorArrangement[square]===decidedColor && !isBlank)){
            setScoreDisplay((score)=>score+3)
                 rowOfThree.forEach(square=>currentColorArrangement[square]= blank)  
                 return true                  
          }
        }
      }
    
      const moveIntoSquareBelow = ()=>{
        for(let i=0;i<=55;i++){
          const firstRow =[0,1,2,3,4,5,6,7]
          const isFirstRow = firstRow.includes(i)
    
          if(isFirstRow && currentColorArrangement[i]===blank){
            let randomNumber = Math.floor(Math.random()*candyColors.length)
            currentColorArrangement[i]= candyColors[randomNumber]
          }
          if((currentColorArrangement[i+width])===blank){
            currentColorArrangement[i+width]=currentColorArrangement[i]
            currentColorArrangement[i]=blank
          }
        }
        
      }
    
      const dragStart = (e)=>{
        console.log(e.target);
        console.log("drag start");
        setSquareDragged(e.target)
      }
      const dragDrop = (e)=>{
        console.log(e.target);
    
        console.log("drag drop");
        setSquareReplaced(e.target)
      }
      const dragEnd = ()=>{
    
        console.log("drag end");
        const squareDraggedId = parseInt(squareDragged.getAttribute('data-id'))
    
        const squareReplacedId = parseInt(squareReplaced.getAttribute('data-id'))
    
        currentColorArrangement[squareReplacedId] = squareDragged.getAttribute('src')
        currentColorArrangement[squareDraggedId] = squareReplaced.getAttribute('src')
        const validMoves = [
          squareDraggedId - 1,
          squareReplacedId - width,
          squareDraggedId + 1,
          squareReplacedId + width
         ]
    
         const validMove = validMoves.includes(squareReplaced)
    
          const isAColumnOfFour =    checkColumnOfFour()
          const isARowOfFour = checkRowOfFour()
          const isAColumnOfThree = checkColumnOfThree()
        
          const isARowOfThree =  checkRowOfThree()

    
          if(squareReplacedId && validMove &&
             (isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour)){
              setSquareReplaced(null)
              setSquareDragged(null)
             }else{
              currentColorArrangement[squareReplacedId] = squareReplaced.getAttribute('src')
              currentColorArrangement[squareDraggedId] = squareDragged.getAttribute('src')
             setCurrentColorArrangement([...currentColorArrangement])
             }
    

      }

    
     
      
    
      const createBoard = ()=>{
        const randomColorArrangement = []
        for(let i=0;i<width*width;i++){
          const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)];
          randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
      }

      useEffect(()=>{
        createBoard()
       },[])
      
      useEffect(()=>{
        const timer = setInterval(()=>{
            checkColumnOfFour();
            checkRowOfFour();
            
          checkColumnOfThree()
         
          checkRowOfThree()
          moveIntoSquareBelow()
          setCurrentColorArrangement([...currentColorArrangement])
        },100)
        return ()=>clearInterval(timer)
        
      },[checkColumnOfFour,checkRowOfFour,checkColumnOfThree,checkRowOfThree,moveIntoSquareBelow,currentColorArrangement])
      
      useEffect(()=>{
        if(milestoneScores.includes(scoreDisplay)){
          setShowConfetti(true)
          setTimeout(() => {
            setShowConfetti(false);
          }, 8000);
        }
       
      },[scoreDisplay])
      useEffect(()=>{
        if(milestoneScores.includes(scoreDisplay)){
        setShowBanner(true)
          setTimeout(() => {
          setShowBanner(false)
          }, 8000);
        }
       
      },[scoreDisplay])
      
  
  return (
    <div className='candy-crush' >
      <nav className='logo'><img src={loadingImage2} alt="" /></nav>
      {showConfetti && <Confetti />}
       {showBanner && <div className='banner'><img src={loadingImage} alt="" /></div>}
      <div className='section1'>
        
         <div className='game'>
        
          {
            currentColorArrangement.map((candyColors, index)=>(
              <img key={index} src={candyColors} alt={candyColors} data-id={index} draggable={true}
              onDragStart={dragStart}
              onDragOver={(e)=>e.preventDefault()} onDragEnter={(e)=>e.preventDefault()} onDragLeave={(e)=>e.preventDefault()} onDragEnd={dragEnd} onDrop={dragDrop} />
            )
          )}
    
         </div>
      </div>
  
     <div> <ScoreBoard score={scoreDisplay}/></div>
             
      </div>
  )
}

export default Game