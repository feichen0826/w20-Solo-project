import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DeleteConfirmationModal.css";
import { deleteCampaignAsync } from "../../store/campaignReducer";
import { Modal, useModal } from "../../context/Modal";

import './DeleteConfirmationModal.css'

const DeleteConfirmationModal = ({ campaignId, show, onCancel }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteCampaignAsync(campaignId));
    closeModal();
  };
  // if (!show) return null;
  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-confirmation-modal">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to remove this campaign?</p>
      <div className="button-container">
        <button className="confirm-delete-button" onClick={handleDelete}>
          Yes (Delete campaign)
        </button>
        {/* <button className="cancel-delete-button" onClick={onCancel}> */}
        <button className="cancel-delete-button" onClick={handleCancel}>
          No (Keep campaign)
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
