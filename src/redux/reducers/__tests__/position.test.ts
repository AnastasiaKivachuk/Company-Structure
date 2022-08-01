import position from '../position';

describe('test position reducers', () => {
  it('SET_INIT_POSITION', () => {
    const test = { x: 1000,
      y: 1000 };
    let state = { x: -1000,
      y: -1000 };
    state = position(state, { type: 'SET_INIT_POSITION', payload: { ...test } });
    expect(state).toEqual(test);
  });

  it('default case', () => {
    let state = { x: -1000,
      y: -1000 };
    state = position(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({ x: -1000,
      y: -1000 });
  });
});
