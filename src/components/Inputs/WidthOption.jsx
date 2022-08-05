function WidthOption({ changeFFT }) {
  return (
    <div className="width">
      FFT SIZE
      <select
        className="fft-select-list"
        onChange={(e) => {
          changeFFT(e);
        }}
      >
        <option value="none" defaultValue disabled hidden>
          Select
        </option>
        <option value="64">X-Wide</option>
        <option value="128">Wide</option>
        <option value="256">-Less Wide</option>
        <option value="512">Medium</option>
        <option value="1024">Less Narrow</option>
        <option value="2048">Narrow</option>
        <option value="4096">X-Narrow</option>
      </select>
    </div>
  );
}

export default WidthOption;
