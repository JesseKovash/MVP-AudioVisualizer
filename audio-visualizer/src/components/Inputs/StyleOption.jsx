function StyleOption({ changeVisualType }) {
  return (
    <div className="buttons-container">
      STYLE
      <select
        className="type-select-list"
        onChange={(e) => changeVisualType(e)}
      >
        <option value="none" defaultValue disabled hidden>
          Select
        </option>
        <option value="bars">Bars</option>
        <option value="circles">Circles</option>
      </select>
    </div>
  );
}

export default StyleOption;
