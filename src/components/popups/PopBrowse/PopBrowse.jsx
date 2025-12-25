import Calendar from "../../Calendar/Calendar.jsx";

const PopBrowse = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="pop-browse">
            <div className="pop-browse__container">
                <div className="pop-browse__block">
                    <div className="pop-browse__content">
                        <div className="pop-browse__top-block">
                            <h3 className="pop-browse__ttl">Название задачи</h3>
                            <div className="topics__theme theme-top _orange _active-topic">
                                <p className="_orange">Web Design</p>
                            </div>
                        </div>

                        <div className="pop-browse__status status">
                            <p className="status__p subttl">Статус</p>
                            <div className="status__themes">
                                <div className="status__theme _gray">
                                    <p className="_gray">Нужно сделать</p>
                                </div>
                            </div>
                        </div>

                        <div className="pop-browse__wrap">
                            <form className="pop-browse__form form-browse">
                                <div className="form-browse__block">
                                    <label htmlFor="textArea01" className="subttl">
                                        Описание задачи
                                    </label>
                                    <textarea
                                        className="form-browse__area"
                                        id="textArea01"
                                        readOnly
                                        placeholder="Введите описание задачи..."
                                    ></textarea>
                                </div>
                            </form>

                            <Calendar
                                month="Сентябрь 2023"
                                selectedDate="08.09.2023"
                            />
                        </div>

                        <div className="theme-down__topics theme-down">
                            <p className="topics__p subttl">Категория</p>
                            <div className="topics__theme _orange _active-topic">
                                <p className="_orange">Web Design</p>
                            </div>
                        </div>

                        <div className="pop-browse__btn-browse">
                            <div className="btn-group">
                                <button
                                    className="btn-browse__edit _btn-bor _hover03"
                                    onClick={() => {
                                        alert("Редактирование — пока не реализовано");
                                    }}
                                >
                                    Редактировать задачу
                                </button>
                                <button
                                    className="btn-browse__delete _btn-bor _hover03"
                                    onClick={() => {
                                        if (confirm("Удалить задачу?")) {
                                            // Логика удаления
                                            onClose();
                                        }
                                    }}
                                >
                                    Удалить задачу
                                </button>
                            </div>
                            <button
                                className="btn-browse__close _btn-bg _hover01"
                                onClick={onClose}
                            >
                                Закрыть
                            </button>
                        </div>

                        {/* Этот блок с редактированием можно убрать или показывать по условию */}
                        {/* <div className="pop-browse__btn-edit _hide">...</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopBrowse;