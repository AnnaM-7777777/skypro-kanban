export default function PopConfirmLogout({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="pop-exit">
            <div className="pop-exit__container">
                <div className="pop-exit__block">
                    <div className="pop-exit__ttl">
                        <h2>Выйти из аккаунта?</h2>
                    </div>
                    <div className="pop-exit__form-group">
                        <button
                            className="pop-exit__exit-yes _hover01"
                            onClick={onConfirm}
                        >
                            Да, выйти
                        </button>
                        <button
                            className="pop-exit__exit-no _hover03"
                            onClick={onCancel}
                        >
                            Нет, остаться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
