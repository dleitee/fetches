import { createUrl } from '../src/url'

describe('URL Module', () => {
  test('url module must have the method createUrl', () => {
    expect(createUrl).toBeDefined()
  })
  describe('when the first parameter be a string without variables', () => {
    test(' should return the first parameter', () => {
      expect(createUrl('posts')).toBe('posts')
      expect(createUrl('posts/new')).toBe('posts/new')
    })
  })
  describe('when the first parameter be a string with variables', () => {
    test('should return the parameter with the variables replaced', () => {
      expect(createUrl('posts/:id', { id: 1 })).toBe('posts/1')
      expect(createUrl('posts/:id/:name', { id: 1 })).toBe('posts/1/:name')
      expect(createUrl('posts/:id/:name', { id: 1, name: 'joaquim' })).toBe('posts/1/joaquim')
      expect(createUrl('posts/:id/:name/:id', { id: 1, name: 'joaquim' })).toBe('posts/1/joaquim/1')
      expect(createUrl('posts/:id/:name/:Id', { id: 1, name: 'joaquim' })).toBe(
        'posts/1/joaquim/:Id'
      )
    })
  })
  describe('when the first parameter be an array without variables', () => {
    test('should return the array joined by /', () => {
      expect(createUrl(['posts'])).toBe('posts')
      expect(createUrl(['posts', 'new'])).toBe('posts/new')
    })
  })
  describe('when the first parameter be an array with variables', () => {
    test('should return the array joined by / with the variables replaced', () => {
      expect(createUrl(['posts', ':id'], { id: 1 })).toBe('posts/1')
      expect(createUrl(['posts', ':id', ':id'], { id: 1 })).toBe('posts/1/1')
    })
  })
})
