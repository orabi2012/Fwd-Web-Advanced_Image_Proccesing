import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Check Express Main Endpoints', () => {
  it('check server is running (/)', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    //done();
  });
  it('check server Not running (/test)', async () => {
    const response = await request.get('/test');
    expect(response.status).toBe(404);
    //done();
  });
});
