import { render, fireEvent, createEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import App from './App';

test('renders a hint value of 3', () => {
  const { getAllByText } = render(<App />);
  const hints = getAllByText("3");
  hints.map(el => expect(el).toBeInTheDocument());
});

test('title on first cell', () => {
  const { getByTitle } = render(<App />);
  const firstCell = getByTitle('row 1, column 1')
  expect(firstCell).toBeInTheDocument();

  // userEvent.click(firstCell, { buttons: 1, pointerType: 'mouse' })

  // this should work but does not, upstream issue with JSDom
  // these properties do not get set on the event object but they should
  // https://github.com/jsdom/jsdom/pull/2666#issuecomment-615977553
  // https://github.com/testing-library/dom-testing-library/issues/558

  // fireEvent.pointerDown(firstCell, { buttons: 1, pointerType: 'mouse' })
  // expect(getByTitle('row 1, column 1')).toHaveClass('filled')

  // const event = createEvent('pointerdown', firstCell, { buttons: 1, pointerType: 'mouse' })
  // console.log(event.buttons)
});

// test('fires event with custom properties', () => {
//   // Once jsdom is updated, this should output "Escape" to console
//   const spy = jest.fn((event) => { console.log(event.type, event.key) })
//   document.addEventListener('pointerdown', spy)
//   fireEvent.pointerDown(document, { key: 'Escape' })
//   expect(spy).toHaveBeenCalledTimes(1)
//   document.removeEventListener('pointerdown', spy)
// })
