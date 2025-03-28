import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import "./styles/theme.css";

console.log("React приложение загружается!");

const Root = () => {
    const theme = useSelector((state) => state.theme.mode);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className={theme}>
            <App />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Root />
        </Provider>
    </React.StrictMode>
);