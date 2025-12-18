export default function CardLoader() {
    return (
        <div className="cards__item">
            <div className="cards__card card card--loading">
                <div className="card__group">
                    <div className="card__theme _gray"></div>
                    <div className="card__btn"></div>
                </div>
                <div className="card__content">
                    <div className="card__title skeleton"></div>
                    <div className="card__date skeleton"></div>
                </div>
            </div>
        </div>
    );
}
