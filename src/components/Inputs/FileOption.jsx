function FileOption({ audioFiles, choseUploadedFile }) {
  return (
    <div className="file-container">
    MY TUNES
    <select
      className="file-options"
      onChange={(e) => {
        choseUploadedFile(e);
      }}
    >
      {  audioFiles.map((oneFile, index) => (
      <option value={oneFile[1]} key={index}>
        {oneFile[0]}
      </option>
    )
  )};
    </select>
  </div>
  )
};

export default FileOption

