function BackgroundColorOption({ changeBackground }) {
  return (
    <div className="color">
      BACKGROUND
      <select
        name="colorSelect"
        className="background-select-list"
        onChange={(e) => {
          changeBackground(e);
        }}
      >
        <option value="none" defaultValue disabled hidden>
          Select
        </option>
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
  );
}

export default BackgroundColorOption;
