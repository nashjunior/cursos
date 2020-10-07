import request from 'supertest';
import app from '../confg/app';

describe(`Content Type MiddleWare`, () => {
  test(`Should  return content type as json by default`, async () => {
    app.get(`/test_content_type`, (req, res) => {
      res.send(req.body);
    });
    await request(app).get(`/test_content_type`).expect(`content-type`, /json/);
  });

  test(`Should return xml content type when forced`, async () => {
    app.get(`/test_content_type_xml`, (req, res) => {
      res.type(`xml`);
      res.send(req.body);
    });
    await request(app)
      .get(`/test_content_type_xml`)
      .expect(`content-type`, /xml/);
  });
});
