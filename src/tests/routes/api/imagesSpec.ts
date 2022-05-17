import supertest from 'supertest';
import app from '../../../app';
// import fs from 'fs';

const request = supertest(app);

// beforeAll(() => {
//   const dir = './dist/images/thumb';

//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }
// });
describe('Check Image Endpoint /api/images/:imgName/:height/:width', function () {
  it('check /api/images/fjord/100/100 => Image Found', async () => {
    const response = await request.get('/api/images/fjord/100/100');
    expect(response.status).toBe(200);
    //done();
  });
  it('check /api/images/fjordx/100/100 => Image Not Found', async () => {
    const response = await request.get('/api/images/fjordx/100/100');
    expect(response.status).toBe(404);
    //done();
  });

  it('check /api/images/fjord/100/width => width and height must be a number', async () => {
    const response = await request.get('/api/images/fjord/100/width');
    expect(response.status).toBe(400);
    //done();
  });
  it('check /api/images/fjord/100/0 => width and height must be greater than 0', async () => {
    const response = await request.get('/api/images/fjord/100/0');
    expect(response.status).toBe(400);
    //done();
  });
});
