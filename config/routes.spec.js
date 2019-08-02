const db = require('../database/dbConfig');
const request = require('supertest');

const server = require('../api/server');
const Users = require('./usersModel');

beforeEach(async () => {
  await db('users').truncate();
});

describe('create user', () => {
  it('add a new user to the db', async () => {
    let users = await Users.getAllUsers();
    expect(users).toHaveLength(0);

    await Users.addUser({ username: 'Marty', password: 'password' });
    await Users.addUser({ username: 'Twummy', password: 'password' });
    await Users.addUser({ username: 'Mensah', password: 'password' });
    users = await Users.getAllUsers();

    expect(users).toHaveLength(3);
  });

  it('add a specific user', async () => {
    let users = await Users.getAllUsers();
    expect(users).toHaveLength(0);

    await Users.addUser({ username: 'Marty', password: 'password' });
    await Users.addUser({ username: 'Twummy', password: 'password' });
    await Users.addUser({ username: 'Mensah', password: 'password' });
    users = await Users.getAllUsers();

    expect(users[0].username).toBe('Marty');
    expect(users[1].username).toBe('Twummy');
    expect(users[2].username).toBe('Mensah');
  })
})

// describe('registers user', () => {
//   it('[POST] /api/register works', () => {
//     return request(server)
//       .post('/api/register')
//       .expect(201)
//       // .expect('Content-Length', '16')
//       // .expect('Content-Type', /json/)
//       // .then(res => {
//       //   expect(res.body).toEqual({ content: 'up' })
//       // })
//   })
// })
