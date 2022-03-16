import App from './App.jsx';
import { useEffect, useState, useRef } from 'react';

function Canvas(props) {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioControlsRef = useRef(null);
  const audioElement = document.getElementById("audioControls");
  const [audioNode, setaudioNode] = useState(false);

  let myReq;
  let eraseContext;
  let analyser = window.jk_visualizer_analyser;
  let audioContext = window.jk_audioContext;

  const showMeTheTunes = function () {
    const canvasElement = document.getElementById("canvas");
    canvasElement.width = canvasElement.offsetWidth || 640;
    canvasElement.height = canvasElement.width * 0.56;
    console.log(canvasElement.offsetWidth)

    const ctx = canvasElement.getContext("2d");
    window.jk_ctx = ctx;
    eraseContext = ctx;
    audioControlsRef.current.play()
    if (!audioContext) {
      window.jk_audioContext = new AudioContext();
      audioContext = window.jk_audioContext;
    }
    if (!audioNode) {
      let audioSource = audioContext.createMediaElementSource(audioElement);
      window.jk_visualizer_analyser = audioContext.createAnalyser();
      analyser = window.jk_visualizer_analyser;
      audioSource.connect(analyser);
      analyser.connect(audioContext.destination);
      setaudioNode(true);
    }

    analyser.fftSize = props.fftChoice;
    const bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    const barWidth = (canvasElement.width / bufferLength);
    let barHeight;
    let x;

    const animate = function () {
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

        //hollowbars
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

      myReq = requestAnimationFrame(animate);
      window.jk_req = myReq;
    }
    animate()
  }

  const stopAnimation = function (req, ctx) {
    console.log('inside stop tunes')
    audioElement.pause();
    audioElement.currentTime = 0;
    window.cancelAnimationFrame(req)
    ctx?.clearRect(0, 0, 640, 320);
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
        onEnded={() => stopAnimation(window.jk_req, window.jk_ctx)}
      ></audio>
      <div className="canvas-buttons">
      <button className="show-tunes-button" onClick={showMeTheTunes}>SHOW ME THE TUNES</button>
      <button className="save-tunes-button" onClick={()=>{}}>SAVE THE TUNES</button>
      <button className="stop-tunes-button" onClick={(req, ctx)=>(stopAnimation(req, ctx))}>STOP THE TUNES</button>
      </div>
      <canvas
        id="canvas"
        ref={canvasRef}
        // onClick={()=>(showMeTheTunes())}
        style={{ outline: '1px solid white', width: '100%', backgroundColor: props.backgroundChoice }}
      ></canvas>
    </div>
  );
}

export default Canvas;