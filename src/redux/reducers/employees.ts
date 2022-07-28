import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE, MOVE_NODE,
  SET_ALL_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from '../constants';

const initialState = {
  employees: [],
  edges: [],
};

const employees = (state = initialState, { type, payload }: {type: string, payload: any}) => {
  switch (type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, payload.employees],
        edges: [...state.edges, payload.edges],
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: payload.employees,
        edges: payload.edges,
      };
    case SET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: payload.employees,
        edges: payload.edges,
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: payload.employees,
      };
    case MOVE_NODE:
      return {
        ...state,
        employees: payload.employees ? payload.employees : state.employees,
        edges: payload.edges ? payload.edges : state.edges,
      };
    default:
      return state;
  }
};

export default employees;
