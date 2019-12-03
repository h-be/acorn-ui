import React from "react";
import "./popup.css";
import Icon from "../../Icon";
import Button from "../../Button/Button";

export default function Popup({ active, handleToHide }) {
  return (
    <div className={'popup ' + (active ? 'active' : '')}>
      <div className='popup-window'>
        <Icon name="x_a3a3a3.svg" onClick={handleToHide} className="btn-close-modal" />
        <div className="popup-header">
          <span className="popup-logo">
            <Icon name="export.svg" />
          </span>
          <span className="popup-title">Exporting</span>
        </div>
        <div className="popup-content">
          <p>
            You just exported the <b>H-BE SoA</b> canvas. You will be able to
            find it in your Downloads folder!
          </p>
        </div>
        <div className="popup-footer">
          <div className="check-no-show-again">
            <input type="checkbox" />
            <label htmlFor="">Don't show me again</label>

          </div>
          <div className="btn-accept">
            <Button text="OK" onClick={handleToHide} />
          </div>
        </div>
      </div>
    </div>
  );
}
