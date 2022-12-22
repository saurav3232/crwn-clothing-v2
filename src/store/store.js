
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

import logger from 'redux-logger';
const persistConfig={
    key:'root',
    storage:storage,
    blacklist:['user']//Since user value is coming from auth state listener
}
const persistedReducer=persistReducer(persistConfig,rootReducer);
const middlewares=[process.env.NODE_ENV!=="production" &&  logger].filter(Boolean);

const composeEnhancer=(process.env.NODE_ENV!=="production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers=composeEnhancer(applyMiddleware(...middlewares));



export const store=createStore(persistedReducer,undefined,composedEnhancers);
export const persistor=persistStore(store);
