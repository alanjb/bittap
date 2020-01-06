import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(createSagaMiddleware)),
);

export default store;