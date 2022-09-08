import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import userReducer from './reducers/userSlice';
import bottomTabReducer from './reducers/bottomTabSlice';
import friendsReducer from './reducers/friendsSlice';
import requestsReducer from './reducers/requestsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'friends', 'requests'],
};

const reducers = combineReducers({
  user: userReducer,
  bottomTab: bottomTabReducer,
  requests: requestsReducer,
  friends: friendsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
