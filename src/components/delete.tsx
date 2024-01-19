import React from "react";

interface DeleteButtonProps {
  handleDeleteSelected: () => void;
  selectedRows: any[]; // Replace 'any[]' with the actual type of your selectedRows if possible
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ handleDeleteSelected, selectedRows }) => {
  return (
    <button
      className={`delete-selected-button ${selectedRows.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleDeleteSelected}
      disabled={selectedRows.length === 0}
    >
      Delete Selected
    </button>
  );
};

export default DeleteButton;
