import App from './App.jsx';
import { useEffect, useState, useRef } from 'react';
// import { recordingOne, recordingTwo } from '../sampleAudio/recordings.js'
// import { NewRecording } from '../sampleAudio/NewRecording.mp3'
function Canvas(props) {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioControlsRef = useRef(null);
  const audioElement = document.getElementById("audioControls");
  let myReq;
  let eraseContext;
  // const [audioSrc, setAudioSrc] = useState();
  // const [audioFiles, setAudioFiles] = useState([]);

  // const updateAudioFiles = function(e) {
  //   let uploadedFile = URL.createObjectURL(e.target.files[0]);
  //   setAudioSrc(uploadedFile);
  //   setAudioFiles([...audioFiles, uploadedFile])
  // }
  const showMeTheTunes = function () {
    console.log('infunction: ', props.visualType);
    const canvasElement = document.getElementById("canvas");
    // canvasElement.width = window.innerWidth * 0.6;
    // canvasElement.height = window.innerHeight * 0.3;
    canvasElement.width = 640;
    canvasElement.height = 320;
    const ctx = canvasElement.getContext("2d");
    eraseContext = ctx;
    audioControlsRef.current.play()
    const audioContext = new AudioContext();
    let newAudioSource;
    let analyser;
    newAudioSource = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    newAudioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = props.fftChoice;
    const bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    const barWidth = (canvasElement.width / bufferLength);
    let barHeight;
    let x;
    console.log('Before animate: ', props.visualType);

    const animate = function () {
      console.log('in animate: ', props.visualType);
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      x = 0;
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.5;
        const red = 250 * (i / bufferLength);
        const green = 0;
        const blue = barHeight + (2 * (i / bufferLength));
        //bars
        if (props.visualType === 'bars') {
          // ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.fillStyle = props.colorChoice;
          ctx.fillRect(x, canvasElement.height - barHeight, barWidth, barHeight);
        }

        //hollowbars: doesn't completely work
        // ctx.rect(x, canvasElement.height - barHeight, barWidth, barHeight);
        // ctx.strokeStyle = "black";
        // ctx.stroke();

        // circles
        if (props.visualType === 'circles') {
          ctx.beginPath();
          ctx.arc(x, canvasElement.height - barHeight, barWidth * 0.5, 0, 2 * Math.PI);
          ctx.strokeStyle = props.colorChoice;
          ctx.stroke();
          ctx.fillStyle = props.colorChoice;
          ctx.fill();
        }


        //sine wave
        //   ctx.beginPath();
        //   if (i === 0) {
        //     ctx.moveTo(0, canvasElement.height - barHeight);
        //   } else {
        //     ctx.moveTo(x - barWidth, dataArray[i - 1] * 1.5)
        //   }
        //   ctx.lineTo(x, canvasElement.height - barHeight);

        //   ctx.stroke();
        //   ctx.strokeStyle = "black";
        //   ctx.stroke();
        x += barWidth + 0.1;
      }
      // audioControlsRef.onplaying = (event) => {
      //   requestAnimationFrame(animate)
      // }
      myReq = requestAnimationFrame(animate);
    }
    animate()
  }

  const stopAnimation = function(req, ctx) {
    window.cancelAnimationFrame(req)
    ctx.clearRect(0, 0, 640, 320);
  }


  return (
    <div
      className="canvas-container"
      ref={canvasContainerRef}
    >
      {/* <input
        type='file'
        accept="audio/*"
        onChange={(e) => {updateAudioFiles(e) }}
      ></input> */}
      <audio
        id="audioControls"
        // controls
        ref={audioControlsRef}
        src={props.audioSrc}
        onEnded={()=>stopAnimation(myReq, eraseContext)}
      ></audio>
      <button onClick={showMeTheTunes}>Show me the sound</button>
      <canvas
        id="canvas"
        ref={canvasRef}
        // onClick={()=>(showMeTheTunes())}
        style={{ outline: '1px solid red', width: '100%' }}
      ></canvas>
    </div>
  );
}

export default Canvas;