import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// TODO: Decide on whether to use redux-persist, can just use local host & cookies directly
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './redux/store';
import { store } from './redux/store';
import * as serviceWorker from './serviceWorker';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
    </Provider>,
    document.getElementById('root'),
);

// Progressive web-app enabler:
serviceWorker.unregister();
