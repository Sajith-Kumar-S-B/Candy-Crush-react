import './App.css';
import {useEffect, useState} from 'react'

import loadingImage from "./images/ee5587987415cbe577356f68ce38a11d.gif";
import loadingImage2 from './images/candy-crush-soda-candy-crush.gif'
import Game from './components/Game';



function App() {

  
 const [loading,setLoading] = useState(false)
 
 
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
    setLoading(false)
    },4000)
   },[])

 
  return (

    
   <div className='app'>
     {loading ? 
    
    (
      <div className='loading-spinner'>
        <img width={'100%'} src={loadingImage} alt='Loading...' />
        <img width={'100%'} src={loadingImage2} alt='Loading...' />

      </div>
    ) :  <Game/>
    }
   </div>
          
  );
}

export default App;
