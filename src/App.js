
import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);

  function handleFileChange(e){
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    //console.log(url)
    audioRef.current.src = url;
    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration)
    }
  }

  function togglePlay(){
    if(isPlaying){
      audioRef.current.pause()
    }
    else{
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying);
  }

  function formatTime(time){
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min} : ${(sec < 10 )? '0'+sec : sec}`;
  }

  function updateTime(){
    setCurrentTime(audioRef.current.currentTime)
  }

  return (
    <div className="App"> 
      <input type='file' accept='audio/*' onChange={handleFileChange}/>
      <audio ref={audioRef} onTimeUpdate={updateTime}/>
      <div className='controls'>
        <button  onClick={togglePlay}>
          {isPlaying ? 'pause' : 'play'}
        </button>
        <span>{formatTime(currentTime)}</span> 
        <input type='range'
          value={currentTime}
          max={duration}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value
            setCurrentTime(e.target.value)
          }}
        />
        <span>{formatTime(duration)}</span>  
      </div>     
    </div>
  );
}

export default App;
