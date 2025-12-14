import { useState } from "react";
import "./App.css";
import PopUser from "../popups/PopUser/PopUser";
import PopNewCard from "../popups/PopNewCard/PopNewCard";
import PopBrowse from "../popups/PopBrowse/PopBrowse";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="wrapper">
                <PopUser />
                <PopNewCard />
                <PopBrowse />
                <Header />
                <Main />
            </div>

            <h1>Vite + React</h1>

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>

            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
