import employees from '@redux/reducers/employees';

describe('test employees reducers', () => {
  it('ADD_EMPLOYEE', () => {
    const test = {
      employees: { id: 1 },
      edges: { id: 1 },
    };
    const result = {
      employees: [{ id: 1 }],
      edges: [{ id: 1 }],
    };
    let state = {
      employees: [],
      edges: [],
    };
    state = employees(state, { type: 'ADD_EMPLOYEE', payload: test });
    expect(state).toEqual(result);
  });
  it('DELETE_EMPLOYEE', () => {
    const test = {
      employees: [],
      edges: [],
    };
    let state = {
      employees: [{ id: 1 }],
      edges: [{ id: 1 }],
    };
    state = employees(state as any, { type: 'DELETE_EMPLOYEE', payload: test });
    expect(state).toEqual(test);
  });

  it('SET_ALL_EMPLOYEES', () => {
    const test = {
      employees: [{ id: 1 }],
      edges: [{ id: 1 }],
    };
    let state = {
      employees: [],
      edges: [],
    };
    state = employees(state, { type: 'SET_ALL_EMPLOYEES', payload: test });
    expect(state).toEqual(test);
  });

  it('UPDATE_EMPLOYEE', () => {
    const test = {
      employees: [{ id: 2 }],
    };

    const result = {
      employees: [{ id: 2 }],
      edges: [{ id: 1 }],
    };

    let state = {
      employees: [{ id: 1 }],
      edges: [{ id: 1 }],
    };
    state = employees(state as any, { type: 'UPDATE_EMPLOYEE', payload: test });
    expect(state).toEqual(result);
  });

  it('MOVE_NODE', () => {
    const test = {
      employees: [{ id: 2 }],
    };

    const result = {
      employees: [{ id: 2 }],
      edges: [],
    };

    let state = {
      employees: [],
      edges: [],
    };
    state = employees(state, { type: 'MOVE_NODE', payload: test });
    expect(state).toEqual(result);
  });

  it('default case', () => {
    let state = {
      employees: [],
      edges: [],
    };
    state = employees(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({
      employees: [],
      edges: [],
    });
  });
});
