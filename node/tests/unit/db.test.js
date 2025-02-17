const connection = require('../../app/config');

describe('Database Connection Tests', () => {
  let testConnection;

  beforeAll(async () => {
    testConnection = connection;
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      testConnection.end(() => {
        resolve();
      });
    });
  });

  it('should connect to database', async () => {
    const result = await new Promise((resolve) => {
      testConnection.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) resolve(err);
        resolve(results);
      });
    });
    
    expect(result[0].solution).toBe(2);
  });
});