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

  if (audioFiles.length === 0) {
    fileOptions = null;
  } else {
    let fileContainer = [];
    audioFiles.forEach((oneFile, index) => {
      fileContainer.push(<option value={index} key={index}>{oneFile[0]}</option>);
    })
    fileOptions = <select id="file-options">{fileContainer}</select>
  }

  return (
    <div className="App">
      <div className="file-options-container">
        <div className="file-container">
          <input
            type='file'
            accept="audio/*"
            onChange={(e) => { updateAudioFiles(e) }}
          ></input>
          {fileOptions}
        </div>
        <div className="options-container">
          <div className="buttons-container">
            Choose style
            <select onChange={(e) => { changeVisualType(e) }}>
              <option value="bars">Bars</option>
              <option value="circles">Circles</option>
            </select>
          </div>
          <div className="width">
            Choose fftSize
            <select onChange={(e) => { changeFFT(e) }}>
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
            Choose color
            <select
              name="colorSelectList"
              className="colorSelect"
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
          {/* <div className="width">Choose fill</div> */}
        </div>
      </div>
      <Canvas
        audioSrc={audioSrc}
        visualType={visualType}
        fftChoice={fftChoice}
        colorChoice={colorChoice}
      />
    </div>
  );
}

export default App;
