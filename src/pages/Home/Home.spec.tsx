/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('Render component Home', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
