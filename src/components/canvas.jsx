import SaveModal from './savemodal.jsx';
import axios from 'axios';
import { useState, useRef } from 'react';

function Canvas(props) {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioControlsRef = useRef(null);
  const audioElement = document.getElementById("audioControls");
  const [audioNode, setaudioNode] = useState(false);
  const [saveMode, setSaveMode] = useState(false);

  const enterName = function(input) {
    if (saveMode) {
      setSaveMode(false);
      axios.post('http://localhost:2000/new_settings', input, { headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      } })
      // axios.post('/new_settings', input, { headers: {
      //   'Access-Control-Allow-Origin': '*'
      // } })
        .then((results) => {
          // setSaveMode(false);
        })
        .catch((err)=> {
          console.log(err)
          // setSaveMode(false);
        })
    } else {
      setSaveMode(true);
    }
  }
  let myReq;
  // let eraseContext;
  let analyser = window.jk_visualizer_analyser;
  let audioContext = window.jk_audioContext;


  const showMeTheTunes = function () {
    const canvasElement = document.getElementById("canvas");
    canvasElement.width = canvasElement.offsetWidth || 640;
    canvasElement.height = canvasElement.width * 0.56;

    const ctx = canvasElement.getContext("2d");
    window.jk_ctx = ctx;
    // eraseContext = ctx;
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

    canvasElement.scrollIntoView({ behavior: 'smooth', block: 'center'});

    analyser.fftSize = props.fftChoice;
    const bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    const barWidth = ((canvasElement.width/2) / bufferLength);
    let barHeight;
    let x;

    const animate = function () {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      //left half
      for (let i = 0; i < bufferLength; i++) {
        let red, green, blue;
        barHeight = dataArray[i] * 1.5;
        if (props.colorChoice === 'dynamic') {
          red = props.red * ((i) / bufferLength * 1.5);
          // green = props.green;
          green = props.green * ((i) / bufferLength * 1.5);
          // blue = barHeight + (5 * (i / bufferLength));
          blue = props.blue * ((i) / bufferLength * 1.5)
        } else {
          red = props.red;
          green = props.green;
          blue = props.blue;
        }
        //solid bars
        if (props.visualType === 'bars' && props.fillChoice === 'solid') {
          // ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.fillRect(canvasElement.width/2 - x, canvasElement.height - barHeight, barWidth, barHeight);
        }
        //hollowbars
        if (props.visualType === 'bars' && props.fillChoice === 'hollow'){
          ctx.rect(canvasElement.width/2 - x, canvasElement.height - barHeight, barWidth, barHeight);
          ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.stroke();
        }

        // circles
        if (props.visualType === 'circles') {
          ctx.beginPath();
          ctx.arc(canvasElement.width/2 - x, canvasElement.height - barHeight, barWidth * 0.5, 0, 2 * Math.PI);
          ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.stroke();
          if (props.fillChoice === 'solid') {
            ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
            ctx.fill();
          }
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
        x += barWidth;
      }

      //right half
      for (let i = 0; i < bufferLength; i++) {
        let red, green, blue;
        barHeight = dataArray[i] * 1.5;
        if (props.colorChoice === 'dynamic') {
          red = props.red * ((i + 2) / bufferLength * 1.75);
          // green = props.green;
          green = props.green * ((i + 2) / bufferLength * 1.75);
          // blue = barHeight + (5 * (i / bufferLength));
          blue = props.blue * ((i + 2) / bufferLength * 1.75)
        } else {
          red = props.red;
          green = props.green;
          blue = props.blue;
        }
        //bars
        if (props.visualType === 'bars' && props.fillChoice === 'solid') {
          ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
          // ctx.fillStyle = props.colorChoice;
          ctx.fillRect(x, canvasElement.height - barHeight, barWidth, barHeight);
        }
        //hollowbars
        if (props.visualType === 'bars' && props.fillChoice === 'hollow'){
          ctx.rect(x, canvasElement.height - barHeight, barWidth, barHeight);
          ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.stroke();
        }

        // circles
        if (props.visualType === 'circles') {
          ctx.beginPath();
          ctx.arc(x, canvasElement.height - barHeight, barWidth * 0.5, 0, 2 * Math.PI);
          ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
          ctx.stroke();
          if (props.fillChoice === 'solid') {
            ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
            ctx.fill();
          }
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
        x += barWidth;
      }

      myReq = requestAnimationFrame(animate);
      window.jk_req = myReq;
    }
    animate()
  }

  const stopAnimation = function (req, ctx) {
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
      <SaveModal
        enterName={enterName.bind(this)}
        saveMode={saveMode}
        visualType={props.visualType}
        fftChoice={props.fftChoice}
        colorChoice={props.colorChoice}
        backgroundChoice={props.backgroundChoice}
        red={props.red}
        green={props.green}
        blue={props.blue}
        />
      <audio
        id="audioControls"
        // controls
        ref={audioControlsRef}
        src={props.audioSrc}
        onEnded={() => stopAnimation(window.jk_req, window.jk_ctx)}
      ></audio>
      <div className="canvas-buttons">
        <button className="show-tunes-button" onClick={showMeTheTunes}>SHOW ME THE TUNES</button>
        <button className="stop-tunes-button" onClick={(req, ctx) => (stopAnimation(req, ctx))}>STOP THE TUNES</button>
        <button className="save-tunes-button" onClick={enterName}>SAVE SETTINGS</button>
      </div>
      <canvas
        id="canvas"
        ref={canvasRef}
        // onClick={()=>(showMeTheTunes())}
        style={{ outline: '1px solid white', backgroundColor: props.backgroundChoice }}
      ></canvas>
    </div>
  );
}

export default Canvas;