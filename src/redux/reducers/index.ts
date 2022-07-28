import { combineReducers } from 'redux';
import employees from './employees';
import position from './position';

const reducer = combineReducers({
  employees,
  position,
});

export default reducer;
