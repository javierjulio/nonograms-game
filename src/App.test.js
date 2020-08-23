import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Learn React link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Learn React");
  expect(linkElement).toBeInTheDocument();
});
