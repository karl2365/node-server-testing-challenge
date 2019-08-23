const request = require('supertest');

const db = require('../data/dbConfig.js');
const server = require('./server.js');


describe('server', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  });

    it('should insert more than one hobbit', async () => {
      await request(server)
        .post('/hobbits')
        .send([
          {
            name: 'sam',
          },
          {
            name: 'rose',
          },
          {
            name: 'frodo',
          },
        ]);

      // check that there are two records in the table
      const hobbits = await db('hobbits');
      expect(hobbits).toHaveLength(3);

    });
    describe('GET /hobbits', () => {
      it('should return an array', () => {
        return request(server)
          .get('/hobbits')
          .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
          });
      });
  });

  it('should delete one hobbit', async () => {
    await request(server)
    .post('/hobbits')
    .send([
      {
        name: 'sam',
      },
      {
        name: 'rose',
      },
      {
        name: 'frodo',
      },
    ])
      .then(res => {
        expect(res.status).toBe(201);
      });
    await request(server)
      .delete('/hobbits/1');
    const hobbits = await db('hobbits');
    expect(hobbits).toHaveLength(2);
    expect(hobbits[0].id).toBe(2);
  })

});





