import {
  ADD_EMPLOYEE, DELETE_EMPLOYEE, MOVE_NODE, SET_ALL_EMPLOYEES, SET_INIT_POSITION, UPDATE_EMPLOYEE,
} from '../constants';

export const addEmployee = (payload: any) => ({
  type: ADD_EMPLOYEE,
  payload,
});

export const deleteEmployee = (payload: any) => ({
  type: DELETE_EMPLOYEE,
  payload,
});

export const updateEmployee = (payload: any) => ({
  type: UPDATE_EMPLOYEE,
  payload,
});

export const setInitPosition = (payload: any) => ({
  type: SET_INIT_POSITION,
  payload,
});

export const setAllEmployees = (payload: any) => ({
  type: SET_ALL_EMPLOYEES,
  payload,
});

export const moveNode = (payload: any) => ({
  type: MOVE_NODE,
  payload,
});
