import React, { useState, useRef, useEffect } from 'react';
import './BackThisProject.css';
import { Modal, useModal } from "../../context/Modal";

const BackThisProject = () => {
  const [pledgeAmount, setPledgeAmount] = useState('');
  const { closeModal } = useModal();
  const modalRef = useRef(null);

  const handleInputChange = (event) => {
    setPledgeAmount(event.target.value);
  };

  const handleContinueClick = () => {

    console.log(`Pledge Amount: ${pledgeAmount}`);
    closeModal();
  };

    const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Back this project</h2>


        <div className='input-container-container'>
        <div className="input-container">
          <span className="dollar-sign">$</span>
          <input
            type="number"
            value={pledgeAmount}
            onChange={handleInputChange}
            placeholder="Enter your pledge"
          />
          <span className="currency">USD</span>
        </div>
        <button className="continue-button" onClick={handleContinueClick}>
          Continue
        </button>
        </div>
        <p className="popup-description">
          Support this project by entering your pledge amount below. You can change or cancel it at any time.
        </p>
      </div>
    </div>
  );
};

export default BackThisProject;
