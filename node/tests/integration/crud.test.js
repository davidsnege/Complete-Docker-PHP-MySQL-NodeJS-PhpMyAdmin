const request = require('supertest');
const app = require('../../app/index');

describe('CRUD API Integration Tests', () => {
  let createdUserId;
  
  // Test CREATE
  describe('CREATE /api/create', () => {
    test('should create a new user successfully', async () => {
      const res = await request(app)
        .post('/api/create')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          pwd: 'testpassword'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.id).toBeDefined();
      createdUserId = res.body.id;
    });

    test('should fail when missing required fields', async () => {
      const res = await request(app)
        .post('/api/create')
        .send({
          name: 'Test User'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
    });
  });

  // Test READ
  describe('READ /api/read', () => {
    test('should get all users', async () => {
      const res = await request(app)
        .get('/api/read');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('should get user by id', async () => {
      const res = await request(app)
        .get(`/api/read/${createdUserId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(createdUserId);
    });
  });

  // Test UPDATE
  describe('UPDATE /api/update', () => {
    test('should update existing user', async () => {
      const res = await request(app)
        .put('/api/update')
        .send({
          id: createdUserId,
          name: 'Updated User',
          email: 'updated@example.com'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
    });

    test('should fail when user does not exist', async () => {
      const res = await request(app)
        .put('/api/update')
        .send({
          id: 99999,
          name: 'Non Existent',
          email: 'none@example.com'
        });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe('error');
    });
  });

  // Test DELETE
  describe('DELETE /api/delete', () => {
    test('should delete by id', async () => {
      const res = await request(app)
        .delete('/api/delete')
        .send({ id: createdUserId });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
    });

    test('should delete by email', async () => {
      const res = await request(app)
        .delete('/api/delete')
        .send({ email: 'updated@example.com' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
    });

    test('should fail when no user found', async () => {
      const res = await request(app)
        .delete('/api/delete')
        .send({ id: 99999 });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe('error');
    });
  });
});