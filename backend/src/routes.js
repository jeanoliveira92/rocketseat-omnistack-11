const express = require('express');
const ong = require('./controllers/ongController')
const incident = require('./controllers/incidentController')
const profile = require('./controllers/profileController')
const session = require('./controllers/sessionController')

const routes = express.Router();

routes.post('/session', session.create);

routes.get('/ongs', ong.index);
routes.post('/ongs', ong.create);

routes.get('/profile', profile.index);

routes.get('/incidents', incident.index);
routes.post('/incidents', incident.create);
routes.delete('/incidents/:id', incident.delete);

module.exports = routes;