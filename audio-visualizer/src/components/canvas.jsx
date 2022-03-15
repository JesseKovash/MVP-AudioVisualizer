import { useEffect, useState, useRef } from 'react';
// import { recordingOne, recordingTwo } from '../sampleAudio/recordings.js'
// import { NewRecording } from '../sampleAudio/NewRecording.mp3'
function Canvas() {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioControlsRef = useRef(null);
  const audioElement = document.getElementById("audioControls");
  // const canvasElement = document.getElementById("canvas");
  const [audioSrc, setAudioSrc] = useState();
  // canvasElement.width = window.innerWidth;
  // canvasElement.height = window.innerHeight;

  const showMeTheTunes = function () {
    const canvasElement = document.getElementById("canvas");
    canvasElement.width = 320;
    canvasElement.height = window.innerHeight * 0.3;
    const ctx = canvasElement.getContext("2d");
    audioControlsRef.current.play()
    const audioContext = new AudioContext();
    let newAudioSource;
    let analyser;
    newAudioSource = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    newAudioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    const barWidth = (canvasElement.width / bufferLength);
    let barHeight;
    let x;
    const animate = function () {
      ctx.clearRect(0,0,canvasElement.width, canvasElement.height);
      x = 0;
      // dataArray = [1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50];
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.5;
        const red = 250 * (i/bufferLength);
        const green = 0;
        const blue = barHeight + (2 * (i/bufferLength));
        //bars
        // ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        // ctx.fillRect(x, canvasElement.height - barHeight, barWidth, barHeight);
        ctx.beginPath();
        ctx.arc(x, canvasElement.height - barHeight, barWidth * 0.5, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fill();
        x += barWidth + 1;
      }
      requestAnimationFrame(animate)
    }
    animate()
  }

  return (
    <div
      className="canvas-container"
      ref={canvasContainerRef}
    >
      <input
        type='file'
        accept="audio/*"
        onChange={(e) => setAudioSrc(URL.createObjectURL(e.target.files[0]))}
      ></input>
      <audio
        id="audioControls"
        controls
        ref={audioControlsRef}
        src={audioSrc}
      ></audio>
      <canvas
        id="canvas"
        ref={canvasRef}
        onClick={()=>(showMeTheTunes())}
        style={{outline: '1px solid red'}}
      ></canvas>
    </div>
  );
}

export default Canvas;