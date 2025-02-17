const request = require('supertest');
const app = require('../../app/index');

describe('CRUD API Tests', () => {
  test('GET /api/read should return success', async () => {
    const response = await request(app).get('/api/read');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });
});