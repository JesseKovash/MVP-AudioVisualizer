function ColorOption({ changeColor }) {
  return (
    <div className="color">
      COLOR
      <select
        name="colorSelect"
        className="color-select-list"
        onChange={(e) => {
          changeColor(e);
        }}
      >
        <option value="none" defaultValue disabled hidden>
          Select
        </option>
        <option value="solid">Solid</option>
        <option value="dynamic">Dynamic</option>
      </select>
    </div>
  );
}

export default ColorOption;
