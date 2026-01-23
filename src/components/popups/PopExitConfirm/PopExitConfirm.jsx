import React from 'react';

export default function PopExitConfirm({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="pop-exit-overlay" onClick={onClose}>
      <div className="pop-exit-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="pop-exit-title">Выйти из аккаунта?</h3>

        <div className="pop-exit-buttons">
          <button
            type="button"
            className="pop-exit-btn pop-exit-btn-yes"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Да, выйти
          </button>

          <button
            type="button"
            className="pop-exit-btn pop-exit-btn-no"
            onClick={onClose}
          >
            Нет, остаться
          </button>
        </div>
      </div>
    </div>
  );
}