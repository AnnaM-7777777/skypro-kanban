const Loader = ({width = 100, height = 30, text = "Данные загружаются...", }) => {
    return (
        <div
            className="loader"
            style={{
                width: width + "%",
                height: height + "px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "#94a6be",
            }}
        >
            {text}
        </div>
    );
};

export default Loader;
