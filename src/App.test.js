import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders column hint value of 5', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("5");
  expect(linkElement).toBeInTheDocument();
});
