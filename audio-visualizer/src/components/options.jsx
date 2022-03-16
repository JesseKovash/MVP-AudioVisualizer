
import { useState } from 'react';
import Canvas from "./canvas"

function Options() {
  // const [audioSrc, setAudioSrc] = useState();
  // const [audioFiles, setAudioFiles] = useState([]);
  // let fileOptions;

  // const updateAudioFiles = function (e) {
  //   let name = e.target.files[0].name;
  //   let uploadedFile = URL.createObjectURL(e.target.files[0]);
  //   // uploadedFile.name = name;
  //   setAudioSrc(uploadedFile);
  //   setAudioFiles([...audioFiles, [name, uploadedFile]])
  // };

  // if (audioFiles.length === 0) {
  //   fileOptions = null;
  // } else {
  //   let fileContainer = [];
  //   audioFiles.forEach((oneFile, index)=> {
  //       fileContainer.push(<option value={index} key={index}>{oneFile[0]}</option>);
  //   })
  //   fileOptions = <select id="file-options">{fileContainer}</select>
  // }

  return (
    <div className="options-container">
     <button>Bars</button>
     <button>Line</button>
     <button>Circles</button>
    </div>
  );
}

export default Options;