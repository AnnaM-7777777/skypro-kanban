const Loader = ({width = 230, height = 30}) => {
    return (
        <div 
            className="loader"
            style={{width: width + 'px', height: height + 'px'}}
        ></div>
    )
};

export default Loader;