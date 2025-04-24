import request from 'supertest';
import express from 'express'; 

const app = express();

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

describe('Health check endpoint', () => {
    test('should return 200 OK', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('OK');
    });
  });