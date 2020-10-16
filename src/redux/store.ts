import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const middleWare = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleWare));

export default store;