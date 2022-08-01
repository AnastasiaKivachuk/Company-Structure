import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Layout from '@modules/Layout/layout';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const renderComponent = (store: any): RenderResult => render(
  <Provider store={store}><Layout><div data-testid="test" /></Layout></Provider>,
);

describe('Layout Component', () => {
  const store = mockStore({});
  beforeEach(() => {
    renderComponent(store);
  });
  it('should render Layout', () => {
    const title = screen.getByTestId('titlePage');
    expect(title).toBeInTheDocument();

    const test = screen.getByTestId('test');
    expect(test).toBeInTheDocument();

    expect(screen.queryByTestId('changeBtn')).not.toBeInTheDocument();

    expect(screen.queryByTestId('toggle')).not.toBeInTheDocument();
  });
});
