
function Recent({ recentSave, changeToPreset }) {
  let recentlySaved =  recentSave.length > 0 ?
    recentSave.map((oneSetting, index) => {
    return (
      <div key={index} className="recent-option" onClick={()=>changeToPreset(oneSetting)}>{oneSetting.name}</div>
    )
  }) :
  null;

  return (
    <div className="recent-container">
      {recentlySaved}
    </div>
  );
}

export default Recent;