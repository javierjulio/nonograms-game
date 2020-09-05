import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders column hint value of 5', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("5");
  expect(linkElement).toBeInTheDocument();
});

test('title on first cell', () => {
  const { getByTitle } = render(<App />);
  const firstCell = getByTitle('row 1, column 1')
  expect(firstCell).toBeInTheDocument();
});
