import {composeWithDevToolsDevelopmentOnly} from '@redux-devtools/extension';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './redux/reducers/appReducer';
import appSaga from './redux/sagas/appSaga';

const sagaMiddleware = createSagaMiddleware();
// Configuring Redux state
export const store = createStore(appReducer, composeWithDevToolsDevelopmentOnly(applyMiddleware(sagaMiddleware)));
// Running the Saga middleware
sagaMiddleware.run(appSaga);
