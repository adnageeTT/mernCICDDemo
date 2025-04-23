import request from 'supertest';
import app from '../server.js'; // requires app to be exported from server.js

describe('GET /health', () => {
  it('should respond with status 200 and healthy message', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('App is healthy');
  });
});