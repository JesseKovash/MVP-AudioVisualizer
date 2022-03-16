
import { useState } from 'react';
import Canvas from "./canvas"

function SaveModal(props) {
  // const [visibleModal, setVisibleModal] = useState(true);
  const [nameText, setNameText] = useState('');
  const nameUpdate = function (e) {
    setNameText(e.target.value)
  };

  const submitData = function() {
    let info =
    {
        "name": nameText,
        "style": props.visualType || null,
        "fft": props.fftChoice || null,
        "color": props.colorChoice || null,
        "background": props.backgroundChoice || null,
        "shape": props.shape || null,
        "fill": props.fill || null
      }
      props.enterName(info)
  }

  let modal;
  if (props.saveMode ) {
    modal =
    <div className="save-modal-container">
    <p>Please enter a name for your settings</p>
   <input className="modal-input" type="text" onChange={(e)=>{nameUpdate(e)}}></input>
   <button className="modal-button" onClick={()=>{submitData()}}>SAVE SETTINGS</button>
  </div>
  } else {
    modal = null;
  }

  return (
    <div>
      {modal}
    </div>
  );
}

export default SaveModal;