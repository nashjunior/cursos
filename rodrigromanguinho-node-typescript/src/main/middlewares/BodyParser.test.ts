import request from 'supertest';
import app from '../confg/app';

describe(`Body Parser MiddleWare`, () => {
  test(`Should parse body as JSON `, async () => {
    app.post(`/test_body_parser`, (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post(`/test_body_parser`)
      .send({ name: `Rodrigo` })
      .expect({ name: `Rodrigo` });
  });
});
