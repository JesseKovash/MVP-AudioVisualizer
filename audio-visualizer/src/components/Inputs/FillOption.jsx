function FillOption({ changeFill }) {
  return (
    <div className="fill">
      CHOOSE FILL
      <select
        name="fillSelect"
        className="fill-select-list"
        onChange={(e) => {
          changeFill(e);
        }}
      >
        <option value="none" defaultValue disabled hidden>
          Select
        </option>
        <option value="solid">Solid</option>
        <option value="hollow">Hollow</option>
      </select>
    </div>
  );
}

export default FillOption;
