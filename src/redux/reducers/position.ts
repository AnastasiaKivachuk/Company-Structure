import { DEFAULT_POSITION } from '@constants/global.constants';
import { SET_INIT_POSITION } from '../constants';

const initialState = DEFAULT_POSITION;

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
