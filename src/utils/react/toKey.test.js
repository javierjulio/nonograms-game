import { toKey } from './toKey';

test('combines rest values to a string', () => {
  expect(toKey('a', 'b')).toStrictEqual('a_b')
})

test('combines rest values in toString format to a string', () => {
  expect(toKey('a', 1, 2, [3, 4])).toStrictEqual('a_1_2_3,4')
})

test('with empty string returns empty string', () => {
  expect(toKey('')).toStrictEqual('')
})

test('with multiple empty values returns empty string', () => {
  expect(toKey('', '', '')).toStrictEqual('')
})

test('with no arguments it fails with argument required error', () => {
  expect(() => toKey()).toThrowError('At least one argument is required')
})

test('with undefined value it fails', () => {
  expect(() => toKey(undefined)).toThrowError()
})

test('with any value being undefined it fails', () => {
  expect(() => toKey('', undefined, '')).toThrowError()
})

test('with null value it fails', () => {
  expect(() => toKey(null)).toThrowError()
})

test('with any value being null it fails', () => {
  expect(() => toKey('', null, '')).toThrowError()
})
