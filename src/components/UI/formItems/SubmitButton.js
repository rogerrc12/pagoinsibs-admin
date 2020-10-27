import React from "react";

const SubmitButton = (props) => {
  return (
    <div className='box-footer'>
      <button type='submit' className={`btn ${props.className}`} disabled={props.disabled}>
        {props.children}
      </button>
    </div>
  );
};

export default SubmitButton;
