function RGBSliderOption({ changeRGB, red, blue, green }) {
  return (
    <>
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
    </>
  );
}

export default RGBSliderOption;
