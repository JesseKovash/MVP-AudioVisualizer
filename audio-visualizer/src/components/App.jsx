// import logo from './logo.svg';
// import './App.css';
import { useState } from 'react';
import Canvas from "./canvas";
// import Options from "./options";

function App() {
  const [audioSrc, setAudioSrc] = useState();
  const [audioFiles, setAudioFiles] = useState([]);
  const [visualType, setVisualType] = useState('bars');
  const [fftChoice, setfftChoice] = useState(64);
  const [colorChoice, setColorChoice] = useState('black');
  const [backgroundChoice, setBackgroundChoice] = useState('white');
  const [fillChoice, setfillChoice] = useState('solid');
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0)
  // const [shapeChoice, setShapeChoice] = useState('rectangle')
  let fileOptions;

  const updateAudioFiles = function (e) {
    let name = e.target.files[0].name;
    let uploadedFile = URL.createObjectURL(e.target.files[0]);
    setAudioSrc(uploadedFile);
    setAudioFiles([...audioFiles, [name, uploadedFile]])
  };

  const changeVisualType = function (e) {
    let choice = e.target.value;
    setVisualType(choice);
  }

  const changeFFT = function (e) {
    let size = Number(e.target.value);
    setfftChoice(size)
  }

  const changeColor = function (e) {
    setColorChoice(e.target.value);
  }

  const changeBackground = function (e) {
    setBackgroundChoice(e.target.value);
  }

  const changeFill = function (e) {
    setfillChoice(e.target.value);
  }

  const changeRGB = function (e) {
    if (e.target.name === 'red') {
      setRed(e.target.value)
    }
    if (e.target.name === 'green') {
      setGreen(e.target.value)
    }
    if (e.target.name === 'blue') {
      setBlue(e.target.value)
    }
    console.log(red, green, blue)
  }
  // const changeShape = function(e) {
  //   setShapeChoice(e.target.value);
  // }

  if (audioFiles.length === 0) {
    fileOptions = null;
  } else {
    let fileContainer = [];
    audioFiles.forEach((oneFile, index) => {
      fileContainer.push(<option value={index} key={index}>{oneFile[0]}</option>);
    })
    fileOptions =
      <div className="file-container">
        MY FILES
        <select className="file-options">{fileContainer}</select>

      </div>
  }

  return (
    <div className="App">
      <h1>SHOW ME THE TUNES</h1>
      <div className="file-options-container">
        <div className="file-upload-container">
          <input
            className="file-upload-button"
            type='file'
            accept="audio/*"
            onChange={(e) => { updateAudioFiles(e) }}
          ></input>

        </div>
        <div className="options-container">
          {fileOptions}
          <div className="buttons-container">
            STYLE
            <select
              className="type-select-list"
              onChange={(e) => changeVisualType(e)}
            >
              <option value="bars">Bars</option>
              <option value="circles">Circles</option>
            </select>
          </div>
          <div className="width">
            FFT SIZE
            <select
              className="fft-select-list"
              onChange={(e) => { changeFFT(e) }}
            >
              <option value="64">X-Wide</option>
              <option value="128">Wide</option>
              <option value="256">-Less Wide</option>
              <option value="512">Medium</option>
              <option value="1024">Less Narrow</option>
              <option value="2048">Narrow</option>
              <option value="4096">X-Narrow</option>
            </select>
          </div>
          <div className="color">
            COLOR
            <select
              name="colorSelect"
              className="color-select-list"
              onChange={(e) => { changeColor(e) }}
            >
              <option value="black">Black</option>
              <option value="gray">Gray</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
          <div className="color">
            BACKGROUND
            <select
              name="colorSelect"
              className="background-select-list"
              onChange={(e) => { changeBackground(e) }}
            >
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="gray">Gray</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
          {/* <div className="shape">
            SHAPE
            <select
              name="shapeSelect"
              className="shape-select-list"
              onChange={(e) => { changeShape(e) }}
            >
              <option value="rectangle">Rectangle</option>
              <option value="square">Square</option>
              <option value="round">Round</option>
            </select>
          </div> */}
          <div className="fill">
            Choose fill
            <select
              name="fillSelect"
              className="fill-select-list"
              onChange={(e) => { changeFill(e) }}
            >
              <option value="solid">Solid</option>
              <option value="hollow">Hollow</option>
            </select>
          </div>
          <div>
            <label className="color-slider-label color-slider-label-red">Red</label>
            <input
              className="color-slider-bar"
              name="red"
              id="typeinp"
              type="range"
              min="0"
              max="250"
              step="1"
              onChange={(e)=>{changeRGB(e)}}
            ></input>
            <p className="color-values">{red}</p>
            <label className="color-slider-label">Green</label>
            <input
              className="color-slider-bar"
              name="green"
              id="typeinp"
              type="range"
              min="0"
              max="250"
              step="1"
              onChange={(e)=>{changeRGB(e)}}
            ></input>
            <p className="color-values">{green}</p>
            <label className="color-slider-label">Blue</label>
            <input
              className="color-slider-bar"
              name="blue"
              id="typeinp"
              type="range"
              min="0"
              max="250"
              step="1"
              onChange={(e)=>{changeRGB(e)}}
            ></input>
            <p className="color-values">{blue}</p>
          </div>
        </div>
      </div>
      <Canvas
        audioSrc={audioSrc}
        visualType={visualType}
        fftChoice={fftChoice}
        colorChoice={colorChoice}
        backgroundChoice={backgroundChoice}
        fillChoice={fillChoice}
      // shapeChoice={shapeChoice}
      />
    </div>
  );
}

export default App;
