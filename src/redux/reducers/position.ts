import { SET_INIT_POSITION } from '../constants';

const initialState = {
  x: -1000,
  y: -1000,
};

const position = (state = initialState, { type, payload }: {type: string, payload: any}) => {
  switch (type) {
    case SET_INIT_POSITION:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default position;
