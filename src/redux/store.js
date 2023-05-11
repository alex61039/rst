import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { routerMiddleware } from "react-router-redux"
import { createLogger } from "redux-logger"
import { loadingBarMiddleware } from 'react-redux-loading-bar'

export default function configureStore(history) {
    const logger = createLogger();
    return createStore(
        rootReducer,
        applyMiddleware(thunk,
            //logger,
            loadingBarMiddleware({
                promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
            }),
            routerMiddleware(history))
    );
}