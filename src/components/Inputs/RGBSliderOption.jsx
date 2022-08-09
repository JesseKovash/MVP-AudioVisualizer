function RGBSliderOption({ changeRGB, red, blue, green }) {
  return (
    <div className="rgb-container">
      <div className="one-slider">
        <label className="color-slider-label color-slider-label-red">Red</label>
        <input
          className="color-slider-bar"
          name="red"
          id="typeinp"
          type="range"
          min="0"
          max="250"
          step="1"
          onChange={(e) => {
            changeRGB(e);
          }}
        ></input>
        <p className="color-values">{red}</p>
      </div>
      <div className="one-slider">
        <label className="color-slider-label">Green</label>
        <input
          className="color-slider-bar"
          name="green"
          id="typeinp"
          type="range"
          min="0"
          max="250"
          step="1"
          onChange={(e) => {
            changeRGB(e);
          }}
        ></input>
        <p className="color-values">{green}</p>
      </div>
      <div className="one-slider">
        <label className="color-slider-label">Blue</label>
        <input
          className="color-slider-bar"
          name="blue"
          id="typeinp"
          type="range"
          min="0"
          max="250"
          step="1"
          onChange={(e) => {
            changeRGB(e);
          }}
        ></input>
        <p className="color-values">{blue}</p>
      </div>
    </div>
  );
}

export default RGBSliderOption;
