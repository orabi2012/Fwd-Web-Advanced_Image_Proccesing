import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('GET /api', function () {
  it('check /api Endpoint is Found = 200', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    //done();
  });
  it('check /apix Endpoint Not Found = 404', async () => {
    const response = await request.get('/apix');
    expect(response.status).toBe(404);
    //done();
  });
});
