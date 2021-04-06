import { RootState, ActionTypes } from "./types";


import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from "redux-persist";
import ReduxThunk, { ThunkMiddleware } from "redux-thunk";


import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "weather",
  storage,
  blacklist: ['data',]
};

const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer as any);
const store = createStore(persistedReducer,
  applyMiddleware(ReduxThunk, logger)
  // applyMiddleware(ReduxThunk as ThunkMiddleware<RootState, ActionTypes>, logger)
);
let persistor = persistStore(store);

export { store, persistor };