// ImageModal.jsx
import React from 'react';

export default function ImageModal({ image, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <img src={image} alt="Selected" />
      </div>
    </div>
  );
}
