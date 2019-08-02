const server = require('./server');
const request = require('supertest');

// beforeEach(async () => {
//   await db('users').truncate();
// });

describe('server', () => {
  it('[GET] / works', () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect('Content-Length', '16')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toEqual({ content: 'up' })
      })
  })
})