const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ong = require('./controllers/ongController')
const incident = require('./controllers/incidentController')
const profile = require('./controllers/profileController')
const session = require('./controllers/sessionController')

const routes = express.Router();

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), session.create);

routes.get('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().min(10).max(11).required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
    })
}), ong.index);
routes.post('/ongs', ong.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profile.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incident.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), incident.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incident.delete);

module.exports = routes;