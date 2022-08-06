import { useState } from "react";
import Canvas from "./canvas";
import Recent from "./recent";
import FileOption from "./Inputs/FileOption";
import WidthOption from "./Inputs/WidthOption";
import ColorOption from "./Inputs/ColorOption";
import BackgroundColorOption from "./Inputs/BackgroundColorOption";
import RGBSliderOption from "./Inputs/RGBSliderOption";
import StyleOption from "./Inputs/StyleOption";
import FillOption from "./Inputs/FillOption";
import axios from "axios";
import photo from "../images/Stainless-Steel-Sound-Wave-No-Background.svg";

function App() {
  const [audioSrc, setAudioSrc] = useState();
  const [audioFiles, setAudioFiles] = useState([]);
  const [visualType, setVisualType] = useState("bars");
  const [fftChoice, setfftChoice] = useState(64);
  const [colorChoice, setColorChoice] = useState("solid");
  const [backgroundChoice, setBackgroundChoice] = useState("white");
  const [fillChoice, setfillChoice] = useState("solid");
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [recentSave, setRecentSave] = useState([]);

  if (recentSave.length === 0) {
    axios
      // .get("http://localhost:2000/settings")
      .get("/settings")
      .then(({ data }) => {
        if (data?.length < 8) {
          console.log((data))
          setRecentSave(data);
        } else {
          setRecentSave(data.slice(0, 8));
        }
      })
      .catch((err) => {
        console.log("couldnt retrieve recents", err);
      });
  }

  const changeToPreset = function (presetInfo) {
    const { background, color, fft, fill, style, blue, green, red } =
      presetInfo;

    setVisualType(style || "bars");
    setfftChoice(Number(fft) || 64);
    setColorChoice(color || "solid");
    setBackgroundChoice(background || "white");
    setfillChoice(fill || "solid");
    setRed(Number(red) || 0);
    setGreen(Number(green) || 0);
    setBlue(Number(blue) || 0);
  };

  const updateAudioFiles = function (e) {
    let name = e.target.files[0].name;
    let uploadedFile = URL.createObjectURL(e.target.files[0]);
    setAudioSrc(uploadedFile);
    setAudioFiles([...audioFiles, [name, uploadedFile]]);
  };

  const choseUploadedFile = function (e) {
    setAudioSrc(e.target.value);
  };

  const changeVisualType = function (e) {
    let choice = e.target.value;
    setVisualType(choice);
  };

  const changeFFT = function (e) {
    let size = Number(e.target.value);
    setfftChoice(size);
  };

  const changeColor = function (e) {
    setColorChoice(e.target.value);
  };

  const changeBackground = function (e) {
    setBackgroundChoice(e.target.value);
  };

  const changeFill = function (e) {
    setfillChoice(e.target.value);
  };

  const changeRGB = function (e) {
    if (e.target.name === "red") {
      setRed(Number(e.target.value));
    }
    if (e.target.name === "green") {
      setGreen(Number(e.target.value));
    }
    if (e.target.name === "blue") {
      setBlue(Number(e.target.value));
    }
  };

  return (
    <div className="App">
      <div className="header-container">
        <div className="header">SHOW ME THE TUNES</div>
        <img alt="soundwave" src={photo}></img>
      </div>
      <div className="options-saved-container">
        <div className="main-options-container">
          <div className="file-options-container">
            <div className="file-upload-container">
              ADD TUNES
              <input
                className="file-upload-button"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  updateAudioFiles(e);
                }}
              ></input>
            </div>
            <div className="options-container">
              {audioFiles.length === 0 ? null : (
                <FileOption
                  audioFiles={audioFiles}
                  choseUploadedFile={choseUploadedFile}
                ></FileOption>
              )}
              <StyleOption changeVisualType={changeVisualType}></StyleOption>
              <WidthOption changeFFT={changeFFT}></WidthOption>
              <ColorOption changeColor={changeColor}></ColorOption>
              <BackgroundColorOption
                changeBackground={changeBackground}
              ></BackgroundColorOption>
              <FillOption changeFill={changeFill}></FillOption>
              <RGBSliderOption
                changeRGB={changeRGB}
                red={red}
                blue={blue}
                green={green}
              ></RGBSliderOption>
            </div>
          </div>
        </div>
        <div className="recently-saved-container">
          <h3>PRESETS</h3>
          <Recent
            recentSave={recentSave}
            changeToPreset={changeToPreset.bind(this)}
          />
        </div>
      </div>
      <Canvas
        audioSrc={audioSrc}
        visualType={visualType}
        fftChoice={fftChoice}
        colorChoice={colorChoice}
        backgroundChoice={backgroundChoice}
        fillChoice={fillChoice}
        red={red}
        green={green}
        blue={blue}
      />
    </div>
  );
}

export default App;
