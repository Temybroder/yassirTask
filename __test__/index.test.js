
const express = require('express');
const app = express();
const routes = require('../api/v1/routes');
app.use(express.json());
app.use('/', routes);

const request = require('supertest')

describe('testing fetchAirQuality endpoint', () => {
   it('returns status code 200 if fetchAirQuality route successful', async () => {
       const serverResponse = await request(app)
       .get('/fetchAirQuality/2.352222/48.856613')
      // .send({longitude: 2.352222, latitude: 48.856613});
       expect(serverResponse.statusCode).toEqual(200)
   });

    it('returns status code 200 if Index route successful', async () => {
        const serverResponse = await request(app)
        .get('/')
        expect(serverResponse.statusCode).toEqual(200)
    });

})

