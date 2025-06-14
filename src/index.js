import React from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import './index.css';
import App from './app';
import { Store,persistor } from './redux/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
        <PersistGate loading={"loading"} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);