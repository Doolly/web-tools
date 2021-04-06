import React from 'react';


const Switch = ({ isOn, handleToggle, disabled, keyname }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={keyname}
        type="checkbox"
        disabled={disabled}
      />
      <label
        style={{ background: isOn && '#A80800' }}
        className="react-switch-label"
        htmlFor={keyname}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
