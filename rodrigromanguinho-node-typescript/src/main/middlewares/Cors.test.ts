import request from 'supertest';
import app from '../confg/app';

describe(`Cors MiddleWare`, () => {
  test(`Should enable cors `, async () => {
    app.get(`/test_cors`, (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .get(`/test_body_parser`)
      .expect(`access-control-allow-origin`, `*`)
      .expect(`access-control-allow-methods`, `*`)
      .expect(`access-control-allow-headers`, `*`);
  });
});
