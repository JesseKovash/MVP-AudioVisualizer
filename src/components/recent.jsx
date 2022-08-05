
function Recent(props) {
  let recentlySaved = props.recentSave.map((oneSetting, index) => {
    return (
      <div key={index} className="recent-option" onClick={()=>props.changeToPreset(oneSetting)}>{oneSetting.name}</div>
    )
  })
  return (
    <div className="recent-container">
      {recentlySaved}
    </div>
  );
}

export default Recent;