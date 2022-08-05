// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createStore, applyMiddleware, compose } from 'redux';

import { getLocalStorageItem, setLocalStorageItem } from '@helpers/localStorage.helpers';
import { DEFAULT_POSITION, LOCAL_STORAGE_EMPLOYEES, LOCAL_STORAGE_POSITION } from '@constants/global.constants';
import { InitEdges, InitNodes } from '@modules/MainPage/utils/mockData';
import { StoreDTO } from '@redux/interfaces/store.interface';
import reducer from './reducers';

const saveToLocalStorage = (state: StoreDTO) => {
  setLocalStorageItem(LOCAL_STORAGE_POSITION, JSON.stringify(state.position));
  setLocalStorageItem(LOCAL_STORAGE_EMPLOYEES, JSON.stringify(state.employees));
};

const loadFromLocalStorage = () => {
  const localStorageInfo = getLocalStorageItem(LOCAL_STORAGE_EMPLOYEES);
  const localStoragePosition = getLocalStorageItem(LOCAL_STORAGE_POSITION);
  const employees = localStorageInfo ? JSON.parse(localStorageInfo) : { employees: InitNodes, edges: InitEdges };
  const position = localStoragePosition ? JSON.parse(localStoragePosition) : DEFAULT_POSITION;
  return { employees, position };
};

const composeEnhancers = typeof window === 'object' && window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const persistedStore = loadFromLocalStorage();

const configureStore = () => createStore(
  reducer,
  persistedStore,
  composeEnhancers(applyMiddleware()),
);

const store = configureStore({ });

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
