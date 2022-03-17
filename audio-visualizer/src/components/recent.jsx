
import { useState } from 'react';
import App from "./App"

function Recent(props) {
  // let exampleData = [{name: 'jesse'}, {name: 'patty'}, {name: 'vanesa'}, {name: 'jennifer'}];
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